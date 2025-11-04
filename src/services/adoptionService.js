import mongoose from "mongoose";
import CustomError from "../utils/custom-error.js";
import { userRepository } from "../repositories/user-repository.js";
import { petRepository } from "../repositories/pet-repository.js";

class AdoptionService {
    constructor(usrRepo,petRepo){
        this.pet = petRepo;
        this.usr = usrRepo;
    }
    /**
     * 
     * @param {string} idUsr 
     * @param {string} idPet 
     * @returns {object} mascotaModificada, usuario
     */
    adopt = async(idUsr,idPet) =>{
        try {
            if(!idUsr || !idPet) throw new CustomError("No hay ID de usuario o de mascota",400)
            //Buscamos el usuario
            const newIdUsr = new mongoose.Types.ObjectId(idUsr);
            const usr = await this.usr.getById(newIdUsr);
            if(!usr) throw new CustomError("No se encontró el usuario buscado");

            //Buscamos la mascota
            const newIdPet = new mongoose.Types.ObjectId(idPet);
            const pet = await this.pet.getById(newIdPet);
            if(!pet) throw new CustomError("No se encontró la mascota buscada");

            //modificamos el estado de la mascota
            pet.owner=usr.first_name;
            pet.adopted=true;
            const modifPet = await this.pet.update(newIdPet,pet);
            if(!modifPet) throw new CustomError("No se pudo actualizar el estado de la mascota");
            
            return {mascota:modifPet,usuario:usr};
            
            

        } catch (error) {
            throw error;
        }
    }
}
export const adoptionService = new AdoptionService(userRepository,petRepository);