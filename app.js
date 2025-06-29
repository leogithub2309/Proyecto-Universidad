import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authControllers from './controllers/auth.controllers.js';
import roles from './controllers/auth.user.controllers.js';
import tipoMoneda from './routes/tipo.moneda.route.js';
import ventasRoutes from './routes/ventas.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import comprasRoutes from './routes/compras.routes.js';


const app = express(),
    port = process.env.PORT || 3000;

//Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes API
app.get("/", (req, res) => {
    return res.send({
        title: "Main Route",
        status: 200,
        description: "Ruta principal de la aplicacion"
    });
});
 
app.post("/crearUsuario", authControllers.register);
app.post("/authUsuario", authControllers.login);
app.get("/rolesUser/:rol", roles.authRoutes);
app.get("/tipoMoneda", tipoMoneda);

app.post("/createVenta/:idUser", ventasRoutes.createVenta);
app.get("/firstVentas/:id", ventasRoutes.getVentasSelects);
app.get("/allVentas/:id", ventasRoutes.getAllVentas);
app.get("/venta/:id", ventasRoutes.getSingleVentas);
app.delete("/deleteVenta/:id", ventasRoutes.deleteVenta);

app.get("/inventory", inventarioRoutes.getInventory);
app.post("/createInventory", inventarioRoutes.createInventory);

app.post("/compra/:id", comprasRoutes.createSold);
app.get("/AllCompras/:id", comprasRoutes.getAllSolds);
app.get("/compraDetalle/:id", comprasRoutes.getSingleCompra);
app.get("/dataChart/:id", comprasRoutes.dataChart);
app.delete("/deleteCompra/:id", comprasRoutes.deleteCompra);

//Server Listen
app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el http://localhost:${port}/`);
});