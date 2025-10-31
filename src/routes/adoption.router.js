import { Router } from "express";
import { adoptionController } from "../controllers/adoptionController.js";

const router = Router();

router.get("/:idUsr/pet/:idPet",adoptionController.adopt);

export default router;