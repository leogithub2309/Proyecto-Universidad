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
        
    } catch (error) {
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la api."
        })
    }
}

const roles = {
    authRoutes
}

export default roles;