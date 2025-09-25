import { Router } from "express";
import { petController } from "../controllers/pet-controller.js";

const route = Router();

route.route("/:id")
    .get(petController.getById)
    .delete(petController.delete)
route.route("/")
   .delete(petController.create)
   .get(petController.getAll)

export default route;