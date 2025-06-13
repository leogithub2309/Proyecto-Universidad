import pool from "../database.js";

const createSold = async (req, res) => {
    
    try {
       
        let { compra_detalle, id_inventario, monto_moneda, id_tipo_moneda, producto_detalle, titulo_producto, tipo_moneda, foto_producto, cantidad_inventario} = req.body;

        let { id } = req.params;

        if(!compra_detalle || !titulo_compra || !producto_detalle || !titulo_producto || !monto_moneda || !tipo_moneda || !id_tipo_moneda || !foto_producto || !cantidad_inventario) {
            return res.status(404).json({
                title: "Error",
                status: 404,
                description: "Error, los campos del formulario no pueden estar vacios."
            });
        }

        const [resultMoneda] = await pool.query(
            "INSERT INTO moneda(id_tipo_moneda, monto_moneda) VALUES(?, ?)", 
            [id_tipo_moneda, monto_moneda]
        );
        console.log(req.body);
        const [resultProducto] = await pool.query(
            "INSERT INTO producto(producto_detalle, titulo_producto, moneda ,foto_producto) VALUES(?,?,?,?)",
            [producto_detalle, titulo_producto, resultMoneda.insertId, foto_producto]
        );

        const [resultCompra] = await pool.query(
            "INSERT INTO compras(compra_detalle, id_usuario, id_producto, id_inventario) VALUES(?,?,?,?)",
            [compra_detalle, id, resultProducto.insertId, id_inventario]
        );
        
        const [dataInventario] = await pool.query(`SELECT cantidad_inventario FROM inventario WHERE id_inventario = ${id_inventario}`);
        
        if(resultCompra.length > 0){
            let sumInventario = dataInventario[0].cantidad_inventario + cantidad_inventario;
            
            const [updateResult] = await pool.query(
                "UPDATE inventario SET cantidad_inventario = ? WHERE id_inventario = ?",
                [sumInventario, id_inventario]
            );

            return res.status(202).json({
                title: "Success",
                status: 202,
                resultCompra
            });
        }
        
        
    } catch (error) {
         return res.status(404).json({
            title: "Error",
            status: 404,
            description: "Error, no se pudo conectar con la API.",
            error
        });
    }

}


export default {
    createSold
}   