import express from "express"
import petRouter from "./routes/pet.router.js";
import userRouter from "./routes/user.router.js";
import mockingRouter from "./routes/mocks.router.js";
import config from "./config/config.js";
import{initMongoDB} from "./config/db-connection.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/pets",petRouter);
app.use("/api/users",userRouter);
app.use("/api/mocks",mockingRouter);
initMongoDB()
    .then(() => console.log("DB conectada!"))
    .catch((error) => console.log(error));

app.listen(config.PORT,()=>console.log(`Servidor escuchando en puerto ${config.PORT}`));