import pool from '../database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    
    let { username, password } = req.body;
    
    if(!username || !password) return res.send({
        title: "Error",
        status: 404,
        description: "Error, los campos del formulario no pueden estar vacios."
    });

    const [data] = await pool.query("SELECT * FROM usuario");

    const verificarLoginUsuario = data.find((user) => user.username === username);

    if(!verificarLoginUsuario) return res.send({
        title: "Error",
        status: 404,
        description: "Error, el usuario no se encuentra registrado."
    });

    const createTokenUser = jsonwebtoken.sign(
        {user: verificarLoginUsuario.username},
        process.env.SECRET_KEY,
        {expiresIn: process.env.EXPIRE_TOKEN}
    );

    const cookieOption = {
        MaxAge: new Date(Date.now() + process.env.EXPIRE_TOKEN *24*60*60*1000), 
        path: "/",
    }

    res.cookie("authTokenUser", createTokenUser, cookieOption);
    
    return res.send({
        title: "Success",
        status: 202,
        result: {
            createTokenUser,
            path: "/dashboard",
        }
    });
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

    try {
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
    
        if(!primer_nombre || !primer_apellido || !cedula || !tipo_identidad || !telefono || !direccion_1 || !codigo_postal || !username || !password || !id_rol) {
            return res.send({
                title: "Error",
                status: 404,
                description: "Error, los campos del formulario no pueden estar vacios."
            });
        }
    
        const [data] = await pool.query("SELECT ct.cedula, u.username, u.password FROM usuario as u INNER JOIN cedula_table ct ON u.id_cedula=ct.id_cedula");
    
        const verificarUsuario = data.find((element) => element.cedula === cedula || element.username === username);
    
        if(verificarUsuario){
            return res.send({
                title: "Error",
                status: 404,
                description: "El usuario que quiere crear, ya se encuentra registrado en la base de datos."
            });
        }   
    
        //generamos una contraseña encriptada
        const generateSalt = await bcrypt.genSalt(10),
            hashingPassword = await bcrypt.hash(password, generateSalt);
    
        //Insercion en la tabla direccion
        let sqlDirections = `INSERT INTO direccion(direccion_1, direccion_2) VALUES('${direccion_1}', '${direccion_2}')`;
        const [directionsResult] = await pool.query(sqlDirections);
    
        //Insercion en la tabla nombre_usuario
        let sqlUsersNames = `INSERT INTO nombre_usuario(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) VALUES('${primer_nombre}', '${segundo_nombre}', '${primer_apellido}', '${segundo_apellido}')`;
        const [usersResult] = await pool.query(sqlUsersNames);
    
        //Insercion en la tabla cedula_table
        let sqlCedula = `INSERT INTO cedula_table(cedula, tipo_identidad) VALUES ('${cedula}', '${tipo_identidad}')`;
        const [cedulaResult] = await pool.query(sqlCedula);
    
        const [contadorUsers] = await pool.query("SELECT COUNT(id_nombre_usuario) as users FROM nombre_usuario"), 
            [contadorCedula] = await pool.query("SELECT COUNT(id_cedula) as ids FROM cedula_table"),
            [contadorDireccion] = await pool.query("SELECT COUNT(id_direccion) as directions FROM direccion");
        
        if(contadorUsers[0].users > 0 && contadorCedula[0].ids > 0 && contadorDireccion[0].directions > 0){
            //insercion en la tabla usuario
            let sqlUser = `INSERT INTO usuario(id_nombre_usuario, id_cedula, telefono, id_direccion, codigo_postal, username, password, id_rol) VALUES (${parseInt(contadorUsers[0].users)}, '${parseInt(contadorCedula[0].ids)}', '${telefono}', '${parseInt(contadorDireccion[0].directions)}','${codigo_postal}', '${username}',' ${hashingPassword}', '${id_rol}')`; 
            const [result] = await pool.query(sqlUser);
    
            if(result){
                return res.send({
                    title: "Success",
                    status: 200,
                    description: "El usuario se ha registrado de manera exitosa!!!",
                    result
                });
            }else{
                return res.send({
                    title: "Error",
                    status: 404,
                    description: "El usuario no se pudo crear correctamente, por favor verifique la información solicitada"
                });
            }
        }
    } catch (error) {
        return res.send({
            title: "Error",
            status: 404,
            error
        });
    }
}



export default {
    login,
    register
}