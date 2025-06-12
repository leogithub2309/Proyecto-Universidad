import pool from "../database.js";

const tipoMoneda = async (req, res) => {

    try {
        
        const [data] = await pool.execute("SELECT * FROM tipo_moneda_table");

        if(data.length > 0){
            return res.status(201).json({
                title: "Success",
                status: 201,
                data
            });
        }

    } catch (error) {
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la API."
        });
    }
}

export default tipoMoneda;