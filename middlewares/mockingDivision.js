import { petController } from "../controllers/pet-controller.js"
import { userController } from "../controllers/user-controller.js";

export const mockingPetAndUser = async(req,res)=>{
    const petControllerResponse =await petController.createMockPet(req,res);
    const userControllerResponse = await userController.createMockUser(req,res);
    console.log(petControllerResponse);
    console.log(userControllerResponse);
    
    
}