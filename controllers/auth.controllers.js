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

    gabrielmedina2 clave
    mariag42 clave
}
*/

const register = async (req, res) => {

    let { nombre, cedula, telefono, direccion, codigo_postal, username, password, id_rol } = req.body;

    if(!nombre || !cedula || !telefono || !direccion || !codigo_postal || !username || !password || !id_rol) {
        return res.send({
            title: "Error",
            status: 404,
            description: "Error, los campos del formulario no pueden estar vacios."
        });
    }

    const [data] = await pool.query("SELECT * FROM usuario");

    const verificarUsuario = data.find((element) => element.cedula === cedula || element.username === username);

    if(verificarUsuario){
        return res.send({
            title: "Error",
            status: 404,
            description: "El usuario que quiere crear, ya se encuentra registrado en la base de datos."
        });
    }   

    const generateSalt = await bcrypt.genSalt(10),
        hashingPassword = await bcrypt.hash(password, generateSalt);

    let sql = `INSERT INTO usuario (nombre, cedula, telefono, direccion, codigo_postal, username, password, id_rol) VALUES ('${nombre}', '${cedula}', '${telefono}', '${direccion}',' ${codigo_postal}', '${username}',' ${hashingPassword}', '${id_rol}')`; //anitagomez1

    const [result] = await pool.query(sql);

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



export default {
    login,
    register
}