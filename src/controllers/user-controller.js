import { userService } from "../services/userService.js";

class UserController {
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
        
            const response = await this.service.getById(id)
            if (!response) return res.status(404).send("No se encontró el usuario");
            return res.status(200).send(response)
        } catch (error) {
            next(error);
        }
    }
    create = async(req,res,next)=>{
        try {
            const body = req.body
            console.log(body);
            
            return  res.send(await this.service.create(body))
        } catch (error) {
            next(error);
        }
    }
    update = async(req,res,next)=>{
        try {
            const body = req.body;
            const {id} = req.params;
            const response = await this.service.update(id,body)
            if (!response) return res.status(404).send("No se encontró el usuario");
            return res.status(200).send(response)
        } catch (error) {
            next(error);
        }
    }
    delete = async(req,res,next) =>{
        try {
            const {id} = req.params;
            const response = await this.service.delete(id);
            if(!response) return await res.status(404).send("No se encontró el usuario");
            return await res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
    createMockUser = async(req,res,next)=>{
         try {
            let {cantUsers, cantPets} = req.params;
            const response = await this.service.createMockUser(cantUsers)
            
            if(!cantPets) {
                return res.status(201).send(response);
            }
            return response;
        } catch (error) {
            next(error);
        }
    }
}
export const userController = new UserController(userService);