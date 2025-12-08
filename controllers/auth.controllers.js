import pool from '../database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    
    let { username, password } = req.body;
    
   try {
        if(!username || !password) return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, los campos del formulario no pueden estar vacios."
        });

        const [data] = await pool.query(
            "SELECT * FROM usuario u INNER JOIN rol r ON u.id_rol=r.id_rol WHERE u.username = ?", 
            [username]
        );

        if(data.length === 0) return res.status(409).json({
            title: "Error",
            status: 409,
            description: "Error, el usuario no se encuentra registrado."
        });

        const createTokenUser = jsonwebtoken.sign(
            {user: data[0].username, rol: data[0].id_rol, userId: data[0].id_usuario, status: data[0].status},
            process.env.SECRET_KEY,
            {expiresIn: process.env.EXPIRE_TOKEN}
        );
        
        const cookieOption = {
            MaxAge: new Date(Date.now() + process.env.EXPIRE_TOKEN *24*60*60*1000), 
            path: "/",
        }

        res.cookie("authTokenUser", createTokenUser, cookieOption);
        
        return res.status(202).json({
            title: "Success",
            status: 202,
            result: {
                createTokenUser,
                path: "/dashboard",
            }
        });
   } catch (error) {
        console.error("No se pudo realizar la peticion debido a que hay un error ", error);
        return res.status(404).json({
            title: "Error",
            status: 404,
            error: error.message || "No se pudo agregar un nuevo usuario, verifique la informacion ingresada."
        });
   }
}

/* Agregar al front de angular
{
    "nombre": "Anita Gomez",
    "cedula": "V-33627493",
    "telefono": "55584932",
    "direccion": "Madrid, España",  
    "codigo_postal": "1109",
    "username": "leoadmin",
    "password": "anitagomez1",
    "rol_id": "2"
}
*/

const register = async (req, res) => {
    let { 
        primer_nombre, 
        segundo_nombre, 
        primer_apellido, 
        segundo_apellido,
        cedula, 
        tipo_identidad,
        telefono, 
        direccion_1,
        direccion_2, 
        codigo_postal,  
        username, 
        password, 
        id_rol 
    } = req.body;
    
    try{
        
    
        if(!primer_nombre || !primer_apellido || !cedula || !tipo_identidad || !telefono || !direccion_1 || !codigo_postal || !username || !password || !id_rol) {
            return res.status(400).json({
                title: "Error",
                status: 404,
                description: "Error, los campos del formulario no pueden estar vacios."
            });
        }
    
        const [data] = await pool.query("SELECT ct.cedula, u.username, u.password FROM usuario u INNER JOIN cedula_table ct ON u.id_cedula=ct.id_cedula WHERE ct.cedula = ? AND u.username = ?", [cedula, username]);
    
        if(data.length > 0){
            return res.status(409).json({
                title: "Error",
                status: 409,// Código para conflicto (recurso ya existe)
                description: "El usuario que quiere crear, ya se encuentra registrado en la base de datos."
            });
        }   
    
        //generamos una contraseña encriptada
        const generateSalt = await bcrypt.genSalt(10),
            hashingPassword = await bcrypt.hash(password, generateSalt);
    

        //Insercion en la tabla direccion
        const [directionsResult] = await pool.query(
            "INSERT INTO direccion(direccion_1, direccion_2) VALUES(?, ?)", 
            [direccion_1, direccion_2]
        );
    
        //Insercion en la tabla nombre_usuario
        const [usersResult] = await pool.query(
            "INSERT INTO nombre_usuario(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) VALUES(?, ?, ?, ?)", 
            [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido]
        );
    
        //Insercion en la tabla cedula_table
        const [cedulaResult] = await pool.query(
            "INSERT INTO cedula_table(cedula, tipo_identidad) VALUES (?, ?)", 
            [cedula, tipo_identidad]
        );
    
        //Recuperando los ids insertados para agregarlo a la tabla usuario
        const id_direccion = directionsResult.insertId,
            id_nombre_usuario = usersResult.insertId,
            id_cedula = cedulaResult.insertId;

        if(directionsResult && usersResult && cedulaResult){
            //insercion en la tabla usuario 
            const [result] = await pool.query(
                "INSERT INTO usuario(id_nombre_usuario, id_cedula, telefono, id_direccion, codigo_postal, username, password, id_rol, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [id_nombre_usuario, id_cedula, telefono, id_direccion, codigo_postal, username, hashingPassword, id_rol, 1]
            );
    
            if(result.affectedRows > 0){
                return res.status(201).json({
                    title: "Success",
                    status: 201,
                    description: "El usuario se ha registrado de manera exitosa!!!",
                    result
                });
            }else{
                return res.status(404).json({
                    title: "Error",
                    status: 404,
                    description: "El usuario no se pudo crear correctamente, por favor verifique la información solicitada"
                });
            }
        }
    }catch(error){
        console.error("No se pudo realizar la peticion debido a que hay un error ", error);
        return res.status(404).json({
            title: "Error",
            status: 404,
            error: error.message || "No se pudo agregar un nuevo usuario, verifique la informacion ingresada."
        });
    }
}



export default {
    login,
    register
}