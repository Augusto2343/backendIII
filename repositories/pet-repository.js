import { petDao } from "../daos/pet-dao.js";

class PetRepository {
    constructor(dao){
        this.dao =dao;
    }
    getAll = async() =>{
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error(error)
        }
    }
    getById = async(id) =>{
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw new Error(error)
        }
    }
    
    create = async(body) =>{
        try {
            return await this.dao.create(body);
        } catch (error) {
            throw new Error(error)
        }
    }

    update = async(id,body) =>{
        try {
            return await this.dao.getByIdAndUpdate(id,body);
        } catch (error) {
            throw new Error(error)
        }
    }
}
export const petRepository = new PetRepository(petDao)