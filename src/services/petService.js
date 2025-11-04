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
    /**
     * 
     * @param {string} id 
     * @returns {object} petRequired
     */
    getById= async(id)=>{
        try {
            const searchId =new  mongoose.Types.ObjectId(id)
            const pet = await this.repo.getById(searchId);
            
            
            if(!pet || pet == {} ) throw new CustomError("Not found",404);
            return pet;
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {object} body 
     * @returns {object} newPet
     */
    create= async(body)=>{
        try {
            return await this.repo.create(body)
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {string} id 
     * @param {object} body 
     * @returns {object} petModified
     */
    update= async(id,body)=>{
        try {
            if(!id || !body) throw  new CustomError("Faltan datos",400);
            return await this.repo.update(id,body)
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {string} id 
     * @returns {object} response
     */
    delete= async(id)=>{
        try {
            const response = await this.repo.delete(id)
            if(!response || response == "") throw new CustomError("No encontrado",404);
            return response
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {Number} cant 
     * @returns {Array} pets
     */
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
                let pet = await this.repo.create(data);
                arrayPets.push(pet)
            }
            
            
            return arrayPets
            
        }catch(e){
            throw e;
        }
    }
}
export const petService = new PetService(petRepository)