import { petService } from "../services/petService.js";

class PetController {
    constructor(service){
        this.service = service;
    }
    getAll = async(req,res,next)=>{
        try {
            return  res.send(await this.service.getAll())
        } catch (error) {
            next(error);
        }
    }
    getById = async(req,res,next)=>{
        try {
            const {id} = req.params;
            return  res.send(await this.service.getById(id))
        } catch (error) {
            next(error);
        }
    }
    create = async(req,res,next)=>{
        try {
            const body = req.body
            return  res.send(await this.service.create(body))
        } catch (error) {
            next(error);
        }
    }
    update = async(req,res,next)=>{
        try {
            const body = req.body;
            const {id} = req.params;
            return  res.send(await this.service.update(id,body))
        } catch (error) {
            next(error);
        }
    }
    createMockPet = async(req,res,next)=>{
         try {
            let {cantpets, cantUsers} = req.params;
            console.log("cantpets from params:", cantpets);
            const result = await this.service.createMockPet(cantpets);
            if(!cantUsers) {
                return res.status(201).send(result);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
    delete = async(req,res,next) =>{
       try {
            const {id} = req.params;
            return  res.send(await this.service.delete(id))
        } catch (error) {
            next(error);
        }
    }
}
export const petController = new PetController(petService);