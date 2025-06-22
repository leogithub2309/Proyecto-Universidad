import pool from "../database.js";

const createSold = async (req, res) => {

    let { compra_detalle, id_inventario, monto_moneda, producto_detalle, titulo_producto, tipo_moneda, foto_producto, cantidad_inventario} = req.body;

    let { id } = req.params;

    if(!compra_detalle || !producto_detalle || !titulo_producto || !monto_moneda || !tipo_moneda || !tipo_moneda || !foto_producto || !cantidad_inventario) {
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, los campos del formulario no pueden estar vacios."
        });
    }

    let connection; // Declarar la conexión fuera del try para que sea accesible en finally

    try {
        connection = await pool.getConnection(); // Obtener una conexión del pool
        await connection.beginTransaction(); // Iniciar una transacción para asegurar la atomicidad de las operaciones

        // 1. Insertar Moneda
        const [resultMoneda] = await connection.query(
            "INSERT INTO moneda(id_tipo_moneda, monto_moneda) VALUES(?, ?)",
            [tipo_moneda, monto_moneda]
        );
        const idMoneda = resultMoneda.insertId;

        if (!idMoneda) {
            throw new Error("No se pudo insertar la moneda.");
        }

        // 2. Insertar Producto
        const [resultProducto] = await connection.query(
            "INSERT INTO producto(producto_detalle, titulo_producto, moneda, foto_producto) VALUES(?,?,?,?)",
            [producto_detalle, titulo_producto, idMoneda, foto_producto]
        );
        const idProducto = resultProducto.insertId;

        if (!idProducto) {
            throw new Error("No se pudo insertar el producto.");
        }

        // 3. Insertar Compra
        const [resultCompra] = await connection.query(
            "INSERT INTO compras(compra_detalle, id_usuario, id_producto, id_inventario) VALUES(?,?,?,?)",
            [compra_detalle, id, idProducto, id_inventario]
        );
        const idCompra = resultCompra.insertId;

        if (!idCompra) {
            throw new Error("No se pudo insertar la compra.");
        }

        // 4. Actualizar Inventario
        const [updateResult] = await connection.query(
            "UPDATE inventario SET cantidad_inventario = cantidad_inventario + ? WHERE id_inventario = ?",
            [cantidad_inventario, id_inventario]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error("No se pudo actualizar el inventario o el id_inventario no existe.");
        }

        await connection.commit(); // Confirmar la transacción si todo fue exitoso

        // Si todo sale bien, enviar la respuesta de éxito
        return res.status(201).json({ // Cambié 202 a 201 porque es una creación exitosa
            title: "Compra Exitosa",
            status: 201,
            description: "La compra se realizó correctamente.",
            idCompra: idCompra // Retornar el ID de la compra creada
        });

    } catch (error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error al procesar la compra:", error); // Log del error para depuración
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


const getAllSolds = async (req, res) => {

     let connection;

    try {
       connection = await pool.getConnection();
       await connection.beginTransaction();

        const[data] = await pool.query(
            "SELECT * FROM compras c INNER JOIN producto p ON c.id_producto=p.id_producto INNER JOIN moneda m ON p.moneda=m.id_moneda INNER JOIN tipo_moneda_table tmp ON m.id_tipo_moneda=tmp.id_tipo_moneda"
        );

        if(data.length === 0){
            throw new Error("No se pudo conectar con la tabla compras");
        }

        await connection.commit();

        return res.status(201).json({
            title: "Lista de Compras",
            status: 201,
            data
        });
        
    } catch (error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error:", error); // Log del error para depuración
        return res.status(500).json({
            title: "Error Interno del Servidor",
            status: 500,
            description: "Ocurrió un error al procesar la compra. Por favor, inténtalo de nuevo más tarde.",
            error: error.message // Incluir el mensaje de error para depuración (opcional en producción)
        });
    }finally {
        if (connection) {
            connection.release(); // Siempre liberar la conexión al pool
        }
    }
}

const getSingleCompra = async (req, res) => {
    
    let connection;
    
    try {

        connection = await pool.getConnection();
        await connection.beginTransaction();

        let {id} = req.params;

        const [data] = await pool.query(
            "SELECT * FROM compras c INNER JOIN producto p ON c.id_producto=p.id_producto INNER JOIN moneda m ON p.moneda=m.id_moneda INNER JOIN tipo_moneda_table tmp ON m.id_tipo_moneda=tmp.id_tipo_moneda WHERE c.id_compras = ?",
            [id]
        );

        if(!data){
            throw new Error("No se pudo realizar la consulta con la Base de Datos");
        }

        connection.commit();

        if(data.length > 0){
             return res.status(202).json({
                title: "Success",
                status: 202,
                data
            });
        }

    } catch (error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error:", error); // Log del error para depuración
        return res.status(500).json({
            title: "Error Interno del Servidor",
            status: 500,
            description: "Ocurrió un error al procesar la compra. Por favor, inténtalo de nuevo más tarde.",
            error: error.message // Incluir el mensaje de error para depuración (opcional en producción)
        });
    }finally {
        if (connection) {
            connection.release(); // Siempre liberar la conexión al pool
        }
    }
}


export default {
    createSold,
    getAllSolds,
    getSingleCompra
}   