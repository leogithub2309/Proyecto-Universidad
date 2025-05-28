import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authControllers from './controllers/auth.controllers.js';
import roles from './controllers/auth.user.controllers.js';
import tipoMoneda from './routes/tipo.moneda.route.js';
import ventasRoutes from './routes/ventas.routes.js';

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
app.get("/firstVentas", ventasRoutes.getVentasSelects);
app.get("/allVentas", ventasRoutes.getAllVentas);
app.get("/venta/:id", ventasRoutes.getSingleVentas);

//Server Listen
app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el http://localhost:${port}/`);
});