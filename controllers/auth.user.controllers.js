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

const roles = {
    authRoutes,
    getAllUsers,
    changeStatusUser
}

export default roles;