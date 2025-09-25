import mongoose from "mongoose";
import { petRepository } from "../repositories/pet-repository.js";
import CustomError from "../utils/custom-error.js";
import { generatePetFaker } from "../utils/petUtils.js";
class PetService {
    constructor(repository){
        this.repo = repository;
    }
    getAll= async()=>{
        try {
            return await this.repo.getAll()
        } catch (error) {
            throw error            
        }
    }

    getById= async(id)=>{
        try {
            const searchId =new  mongoose.Types.ObjectId(id)
            const pet = await this.repo.getById(searchId);
            console.log(pet, typeof(pet));
            
            if(!pet || pet == {} ) throw new CustomError("Not found",404);
            return pet;
        } catch (error) {
            throw error            
        }
    }
    create= async(body)=>{
        try {
            return await this.repo.create(body)
        } catch (error) {
            throw error            
        }
    }
    update= async(id,body)=>{
        try {
            if(!id || !body) throw  new CustomError("Faltan datos",400);
            return await this.repo.update(id,body)
        } catch (error) {
            throw error            
        }
    }
    delete= async(id)=>{
        try {
            const response = await this.repo.delete(id)
            if(!response || response == "") throw new CustomError("No encontrado",404);
            return response
        } catch (error) {
            throw error            
        }
    }
    createMockPet = async(cant)=>{
        try{
            let cantidad=0;
            try{
                 cantidad = parseInt(cant);                 
            }catch(e){
                cantidad = 50;                
            }
            const arrayPets =[]
            for (let i = 1; i <= cantidad; i++) {
                let data = generatePetFaker();
                arrayPets.push(data)
            }
            return await this.repo.create(arrayPets)
        }catch(e){
            throw e;
        }
    }
}
export const petService = new PetService(petRepository)