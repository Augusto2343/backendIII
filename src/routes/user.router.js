import { Router } from "express";
import { userController } from "../controllers/user-controller.js";

const route = Router();

route.route("/")
    .get(userController.getAll)
    .post(userController.create);
    
route.route("/:id")
    .put(userController.update)
    .delete(userController.delete)
    .get(userController.getById);
    



export default route