import pool from "../database.js";

const createVenta = async (req, res) => {

    try{

        let {venta_detalle, producto_detalle, titulo_producto, tipo_moneda, monto_moneda, foto_producto} = req.body;

        let {idUser} = req.params;

        if(!venta_detalle || !producto_detalle || !titulo_producto || !tipo_moneda || !monto_moneda) {
            return res.status(404).json({
                title: "Error",
                status: 404,
                description: "Error, los campos del formulario no pueden estar vacios."
            });
        }

        const [resultMoneda] = await pool.query(
            "INSERT INTO moneda(id_tipo_moneda, monto_moneda) VALUES(?, ?)", 
            [tipo_moneda, monto_moneda]
        )

        const [resultProducto] = await pool.query(
            "INSERT INTO producto(producto_detalle, titulo_producto, moneda ,foto_producto) VALUES(?,?,?,?)",
            [producto_detalle, titulo_producto, resultMoneda.insertId, foto_producto]
        );

        const [resultVenta] = await pool.query(
            "INSERT INTO ventas(venta_detalle, id_producto, id_usuario) VALUES(?, ?, ?)",
            [venta_detalle, resultProducto.insertId, idUser]
        )

        if(resultVenta.length > 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                resultVenta
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
    createVenta
}