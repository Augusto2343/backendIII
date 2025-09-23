import { Router } from "express";

import {userController} from  "../controllers/user-controller.js"
import { petController } from "../controllers/pet-controller.js";
import { mockingPetAndUser } from "../middlewares/mockingDivision.js";
const route = Router();

route.get("/mockingusers/:cantUsers",userController.createMockUser);
route.post("/generateData/:cantPets/:cantUsers",async(req,res) =>{
    const petControllerResponse =await petController.createMockPet(req,res);
    const userControllerResponse = await userController.createMockUser(req,res);
    console.log(petControllerResponse);
    console.log(userControllerResponse);
    const petsAndUsers = [...petControllerResponse,...userControllerResponse]
    res.send(petsAndUsers)
})
route.get("/mockingpets/:cantpets",petController.createMockPet);

export default route;