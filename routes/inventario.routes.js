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

const createInventory = async (req, res) => {

	let {cantidad_inventario, producto_inventario, foto_producto_inventario} = req.body;

	if(!cantidad_inventario || !producto_inventario || !foto_producto_inventario) return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, los campos del formulario no pueden estar vacios."
        });

	let connection;

	try {

		connection = await pool.getConnection()
		await connection.beginTransaction();

		const [result] = await pool.query(
			"INSERT INTO inventario(cantidad_inventario, producto_inventario, foto_producto_inventario) VALUES(?, ?, ?)",
			[cantidad_inventario, producto_inventario, foto_producto_inventario]
		);

		if(!result){
			throw new Error("Ocurrio un error al intentar agregar un nuevo producto a la Base de Datos");
		}

		await connection.commit();

		// Si todo sale bien, enviar la respuesta de éxito
        return res.status(201).json({ // Cambié 202 a 201 porque es una creación exitosa
            title: "Inventario Exitosa",
            status: 201,
            description: "Se agregó nuevo inventario correctamente.",
            result: result.insertId // Retornar el ID de la compra creada
        });

		
	} catch (error) {
		if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error al procesar el inventario:", error); // Log del error para depuración
        return res.status(500).json({
            title: "Error Interno del Servidor",
            status: 500,
            description: "Ocurrió un error al procesar la compra. Por favor, inténtalo de nuevo más tarde.",
            error: error.message // Incluir el mensaje de error para depuración (opcional en producción)
        });
    } finally {
        if (connection) {
            connection.release(); // Siempre liberar la conexión al pool
        }
    }
}


export default {
	getInventory,
	createInventory
}