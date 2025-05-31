import pool from "../database.js";

const createSold = async (req, res) => {

    try {

        let { compra_detalle, titulo_compra, moneda, foto_compra, monto_moneda, id_tipo_moneda } = req.body;

        let { id_usuario } = req.params;

        if(!compra_detalle || !titulo_compra || !moneda || !foto_compra || !monto_moneda || !id_usuario || !id_tipo_moneda) {
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

        const [resultVenta] = await pool.query(
            "INSERT INTO compras(compra_detalle, titulo_compra, foto_compra, moneda ,id_usuario) VALUES(?, ?, ?)",
            [compra_detalle, titulo_compra , foto_compra  ,resultMoneda.insertId, id_usuario]
        );

        if(resultVenta.length > 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                resultVenta
            });
        }

        
    } catch (error) {
        
    }

}   