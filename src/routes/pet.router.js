import { Router } from "express";
import { petController } from "../controllers/pet-controller.js";

const route = Router();

route.route("/:id")
    .get(petController.getById)
    .put(petController.update)
    .delete(petController.delete)
    
route.route("/")
   .post(petController.create)
   .get(petController.getAll)

export default route;