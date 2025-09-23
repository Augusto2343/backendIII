import { Router } from "express";
import { userController } from "../controllers/user-controller.js";

const route = Router();

route.get("/",userController.getAll);
route.get("/:id",userController.getById);
route.post("/",userController.create);

export default route