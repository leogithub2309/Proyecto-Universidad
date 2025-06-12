import pool from "../database.js";

const getInventory = async (req, res) => {

	try{

		const [data] = await pool.execute(
			"SELECT * FROM inventario"
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
            description: "Error, no se pudo conectar con la API."
        });
	}
}

export default {
	getInventory
}