import { Router } from "express";

import {userController} from  "../controllers/user-controller.js"
import { petController } from "../controllers/pet-controller.js";
import { petService } from "../services/petService.js";
import { userService } from "../services/userService.js";

const route = Router();

route.get("/mockingusers/:cantUsers",userController.createMockUser);

route.post("/generateData/:cantPets/:cantUsers",async(req,res) =>{
    try {
        const {cantPets, cantUsers} = req.params;
        const petServiceResponse = await petService.createMockPet(cantPets);
        const userServiceResponse = await userService.createMockUser(cantUsers);
        console.log("Pet response:", petServiceResponse);
        console.log("User response:", userServiceResponse);
        const petsAndUsers = {pets: petServiceResponse || [], users: userServiceResponse || []};
        res.status(201).send(petsAndUsers);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

route.get("/mockingpets/:cantpets",petController.createMockPet);

export default route;