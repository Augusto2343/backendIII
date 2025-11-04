import express from "express"
import petRouter from "./routes/pet.router.js";
import userRouter from "./routes/user.router.js";
import mockingRouter from "./routes/mocks.router.js";
import config from "./config/config.js";
import adoptionController from "./routes/adoption.router.js"
import{initMongoDB} from "./config/db-connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { info } from "./docs/info.js";
import cors from "cors";
//Definición de app como aplicación de express
const app = express();
//configuración de express
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"*"}));
//Configuración de swagger
const specs = swaggerJSDoc(info);
app.use("/apidocs",swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

//definición de rutas
app.use("/api/pets",petRouter);
app.use("/api/users",userRouter);
app.use("/api/mocks",mockingRouter);
app.use("/api/adopt",adoptionController)
//Uso de errorHandler
app.use(errorHandler);

//inicialización de la base de datos
initMongoDB("produccion")
    .then(() => console.log("DB conectada!"))
    .catch((error) => console.log(error));
//Levantado de la aplicación
app.listen(config.PORT || 8000,()=>console.log(`Servidor escuchando en puerto ${config.PORT}`));

export default app;