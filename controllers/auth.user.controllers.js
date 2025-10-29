import pool from "../database.js";

const authRoutes = async (req, res) => {
    try {

        let { rol } = req.params;

        const [data] = await pool.query(
            "SELECT * FROM usuario u INNER JOIN rol r ON u.id_rol=r.id_rol WHERE u.id_rol = ?",
            [rol]
        );

        if(data.length > 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                data
            });
        }
        
    }catch(error){
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la api."
        })
    }
}

const getAllRoles = async (req, res) => {

    try {

        const [data] = await pool.query(
            "SELECT * FROM rol",
            [rol]
        );

        if(data.length > 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                data
            });
        }
        
    }catch(error){
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la api."
        })
    }
}

const getAllUsers = async (req, res) => {

    try {

        const [users] = await pool.query(
            "SELECT * FROM usuario u INNER JOIN nombre_usuario nu ON u.id_nombre_usuario=nu.id_nombre_usuario INNER JOIN cedula_table ct ON u.id_cedula=ct.id_cedula INNER JOIN direccion d ON u.id_direccion=d.id_direccion INNER JOIN rol r ON u.id_rol=r.id_rol"
        )

        if(users.length > 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                users
            });
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

const changeStatusUser = async (req, res) => {

    let { id_usuario } = req.params;

    let { status } = req.body;

    if(!id_usuario) return res.status(401).json({
        title: "Error",
        status: 401,
        description: "El parametro status no se encuentra."
    });

    try {

        const [result] = await pool.query(
            "UPDATE usuario u SET u.status = ? WHERE u.id_usuario = ?",
            [status, id_usuario]
        );

        if(result.affectedRows > 0) return res.status(202).json({
            title: "Success",
            description: "El usuario ahora tiene un status 0, por lo que no podrá ingresar al sistema.",
            status: 202
        });

        
    }catch(error){
         console.error("No se pudo realizar la peticion debido a que hay un error ", error);
        return res.status(404).json({
            title: "Error",
            status: 404,
            error: error.message || "No se pudo conectar con al api, verifique su conexión."
        });
    }

}

const updateUser = async (req, res) => {
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
        status,  
        username, 
        password, 
        id_rol 
    } = req.body;

    let { id_usuario } = req.params;
    
    let connection;

    try {

        connection = await pool.getConnection();
        await connection.beginTransaction();
        
    
        if(!primer_nombre || !primer_apellido || !cedula || !tipo_identidad || !telefono || !direccion_1 || !codigo_postal || !username || !password || !status || !id_rol) {
            return res.status(400).json({
                title: "Error",
                status: 404,
                description: "Error, los campos del formulario no pueden estar vacios."
            });
        }

        const [dataUser] = await pool.query("SELECT * FROM usuario u WHERE u.id_usuario = ?", [id_usuario]);

        const idDireccion = dataUser[0].id_direccion,
            idNombreUsuario = dataUser[0].id_nombre_usuario,
            idCedula = dataUser[0].id_cedula;
    
        //Actualizacion en la tabla direccion
        const [directionsResult] = await pool.query(
            "UPDATE direccion SET direccion_1 = ?, direccion_2 = ? WHERE id_direccion = ?", 
            [direccion_1, direccion_2, idDireccion]
        );

        if(!directionsResult) throw new Error("No se pudo realizar la actualización en la tabla dirección");
    
        //Actualizacion en la tabla nombre_usuario
        const [usersResult] = await pool.query(
            "UPDATE nombre_usuario SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ? WHERE id_nombre_usuario = ?", 
            [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, idNombreUsuario]
        );

        if(!usersResult) throw new Error("No se pudo realizar la actualización en la tabla nombre_usuario");
    
        //Actualizacion en la tabla cedula_table
        const [cedulaResult] = await pool.query(
            "UPDATE cedula_table SET cedula = ?, tipo_identidad = ? WHERE id_cedula = ?", 
            [cedula, tipo_identidad, idCedula]
        );

        if(!cedulaResult) throw new Error("No se pudo realizar la actualización en la tabla cedula_table");
    
        //Actualizacion en la tabla usuario 
        const [result] = await pool.query(
            "UPDATE usuario SET telefono = ?, codigo_postal = ?, username = ?, password = ?, id_rol = ?, status = ? WHERE id_usuario = ?",
            [ telefono, codigo_postal, username, password, id_rol, status, id_usuario]
        );

        await connection.commit();
    
        if(result.affectedRows > 0){
            return res.status(201).json({
                title: "Success",
                status: 201,
                description: "El usuario se ha actualizado de manera exitosa!!!",
                result
            });
        }else{
            return res.status(404).json({
                title: "Error",
                status: 404,
                description: "El usuario no se pudo actualizar correctamente, por favor verifique la información solicitada"
            });
        }
    } catch(error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error al procesar actualización del usuario:", error); // Log del error para depuración
        return res.status(500).json({
            title: "Error Interno del Servidor",
            status: 500,
            description: "Ocurrió un error al procesar la actualización del usuario. Por favor, inténtalo de nuevo más tarde.",
            error: error.message // Incluir el mensaje de error para depuración (opcional en producción)
        });
    }finally {
        if (connection) {
            connection.release(); // Siempre liberar la conexión al pool
        }
    }
}



const roles = {
    authRoutes,
    getAllUsers,
    changeStatusUser,
    getAllRoles,
    updateUser
}

export default roles;