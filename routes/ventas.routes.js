import pool from "../database.js";

const createVenta = async (req, res) => {

    let {venta_detalle, producto_detalle, titulo_producto, tipo_moneda, monto_moneda, foto_producto, id_inventario, cantidad_inventario} = req.body;

    let { idUser } = req.params;

    if(!venta_detalle || !producto_detalle || !titulo_producto || !tipo_moneda || !monto_moneda || !cantidad_inventario) {
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, los campos del formulario no pueden estar vacios."
        });
    }

    let connection; // Declarar la conexión fuera del try para que sea accesible en finally

    try{

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [resultMoneda] = await pool.query(
            "INSERT INTO moneda(id_tipo_moneda, monto_moneda) VALUES(?, ?)", 
            [tipo_moneda, monto_moneda]
        );

        if(!resultMoneda.insertId){
            throw new Error("No se pudo insertar en la tabla moneda"); 
        }

        const [resultProducto] = await pool.query(
            "INSERT INTO producto(producto_detalle, titulo_producto, moneda ,foto_producto) VALUES(?,?,?,?)",
            [producto_detalle, titulo_producto, resultMoneda.insertId, foto_producto]
        );

        if(!resultProducto.insertId){
            throw new Error("No se pudo realizar la inserción en la tabla Producto");
        }

        const [resultVenta] = await pool.query(
            "INSERT INTO ventas(venta_detalle, id_producto, id_inventario ,id_usuario) VALUES(?, ?, ?, ?)",
            [venta_detalle, resultProducto.insertId, id_inventario ,idUser]
        );

        if(!resultVenta.insertId){
            throw new Error("Error durante la inserción en la tabla Ventas");
        }

        const [updateResult] = await pool.query(
            "UPDATE inventario SET cantidad_inventario = cantidad_inventario - ? WHERE id_inventario = ?",
            [cantidad_inventario, id_inventario]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error("No se pudo actualizar el inventario o el id_inventario no existe.");
        }

        await connection.commit();

        return res.status(202).json({
            title: "Venta Exitosa",
            status: 202,
            description: "La venta se realizó correctamente.",
            idVenta: resultVenta.insertId
        });

    }catch(error){
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error al procesar la venta:", error); // Log del error para depuración
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


const getVentasSelects = async (req, res) => {

    let { id } = req.params;

    try {

        const [data] = await pool.execute(
            "SELECT * FROM ventas v INNER JOIN producto p ON v.id_producto=p.id_producto INNER JOIN moneda m ON p.moneda=m.id_moneda INNER JOIN tipo_moneda_table tmp ON m.id_tipo_moneda=tmp.id_tipo_moneda WHERE v.id_venta_detalle < 6 AND v.id_usuario = ?",
            [id]
        );

        if(data.length === 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                data: []
            });
        }

        if(data.length > 0) return res.status(202).json({
                title: "Success",
                status: 202,
                data
            });
        
        
    } catch (error) {
         return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la API.",
            error
        });
    }
}

const getAllVentas = async (req, res) => {

    let { id } = req.params;

    try {

        const [data] = await pool.execute(
            "SELECT * FROM ventas v INNER JOIN producto p ON v.id_producto=p.id_producto INNER JOIN moneda m ON p.moneda=m.id_moneda INNER JOIN tipo_moneda_table tmp ON m.id_tipo_moneda=tmp.id_tipo_moneda WHERE v.id_usuario = ?",
            [id]
        );

        if(data.length === 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                data: []
            });
        }

        if(data.length > 0) return res.status(202).json({
                title: "Success",
                status: 202,
                data
            });
        
        
    } catch (error) {
         return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la API.",
            error
        });
    }
}

const getSingleVentas = async (req, res) => {
    try {

        let { id } = req.params;

        const [data] = await pool.query(
            "SELECT * FROM ventas v INNER JOIN producto p ON v.id_producto=p.id_producto INNER JOIN moneda m ON p.moneda=m.id_moneda INNER JOIN tipo_moneda_table tmp ON m.id_tipo_moneda=tmp.id_tipo_moneda INNER JOIN inventario i ON v.id_inventario=i.id_inventario WHERE v.id_venta_detalle = ?",
            [id]
        );

        if(data.length > 0) return res.status(202).json({
                title: "Success",
                status: 202,
                data
            });
        
        else return res.status(202).json({
                title: "Success",
                status: 202,
                data: []
            });
        

    } catch (error) {
         return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la API.",
            error
        });
    }
}

const updateVenta = async (req, res) => {

    let {
        venta_detalle, 
        producto_detalle, 
        titulo_producto, 
        tipo_moneda, 
        monto_moneda, 
        foto_producto, 
        id_inventario,
        id_producto,
        id_moneda, 
        cantidad_inventario
    } = req.body;

    let { id } = req.params;

    if(!venta_detalle || !producto_detalle || !titulo_producto || !tipo_moneda || !monto_moneda || !cantidad_inventario) {
        return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, los campos del formulario no pueden estar vacios."
        });
    }

    let connection;

    try {

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [resultUpdateVenta] = await pool.query(
            "UPDATE ventas SET venta_detalle = ?, id_inventario = ? WHERE id_venta_detalle = ?",
            [venta_detalle, id_inventario ,id]
        );

        if(!resultUpdateVenta){
            throw new Error("No se pudo realizar la actualización de la tabla ventas.");
        }

        const [resutlUpdateMoneda] = await pool.query(
            "UPDATE moneda SET monto_moneda = ?, id_tipo_moneda = ? WHERE id_moneda = ?",
            [monto_moneda, tipo_moneda ,id_moneda]
        );

        if(!resutlUpdateMoneda){
            throw new Error("La tabla moneda no se pudo actualizar correctamente.");
        }

        const [resultUpdateProducto] = await pool.query(
            "UPDATE producto SET producto_detalle = ?, titulo_producto = ?, foto_producto = ? WHERE id_producto = ?",
            [producto_detalle, titulo_producto, foto_producto ,id_producto]
        );

        if(!resultUpdateProducto){
            throw new Error("La tabla producto no se pudo actualizar correctamente.")
        }

        const [resultUpdateInventario] = await pool.query(
            "UPDATE inventario SET cantidad_inventario = cantidad_inventario - ? WHERE id_inventario = ?",
            [cantidad_inventario, id_inventario]
        );

        if(!resultUpdateInventario){
            throw new Error("No se pudo realizar la actualización en la tabla inventario.");
        }

        await connection.commit();

        return res.status(202).json({
            title: "Venta Actualizada",
            status: 202,
            descripcion: "La venta se acualizó exitosamente",
            resultId: resultUpdateVenta.affectedRows
        });
        
    } catch (error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error al procesar la venta:", error); // Log del error para depuración
        return res.status(500).json({
            title: "Error Interno del Servidor",
            status: 500,
            description: "Ocurrió un error al procesar la venta. Por favor, inténtalo de nuevo más tarde.",
            error: error.message // Incluir el mensaje de error para depuración (opcional en producción)
        });
    }finally {
        if (connection) {
            connection.release(); // Siempre liberar la conexión al pool
        }
    }
}


const deleteVenta = async (req, res) => {

    let { id } = req.params;

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [result] = await pool.execute("DELETE FROM ventas WHERE ventas.id_venta_detalle = ?", [id]);

        if(!result) {
            throw new Error("No se pudo realizar la acción de borrar una venta");
        }

        await connection.commit();

        if(result) res.status(201).json({ // Cambié 202 a 201 porque es una creación exitosa
            title: "Eliminación Exitosa",
            status: 201,
            description: "La venta se eliminó de manera exitosa."
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

export default {
    createVenta,
    getVentasSelects,
    getAllVentas,
    getSingleVentas,
    updateVenta,
    deleteVenta
}