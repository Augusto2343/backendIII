import { Router } from "express";
import { petController } from "../controllers/pet-controller.js";

const route = Router();

route.get("/",petController.getAll);
route.get("/:id",petController.getById);
route.post("/",petController.create);

export default route;