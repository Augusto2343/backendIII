import { petRepository } from "../repositories/pet-repository.js";
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
            const pet = await this.repo.getById(id);
            if(!pet) throw new Error("Not found");
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
            if(!id || !body) throw new Error("Faltan datos");
            return await this.repo.update(id,body)
        } catch (error) {
            throw error            
        }
    }
    delete= async(id)=>{
        try {
            return await this.repo.delete(id)
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
            throw new Error(e);
        }
    }
}
export const petService = new PetService(petRepository)