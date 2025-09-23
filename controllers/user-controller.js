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
            return  res.send(await this.service.getById(id))
        } catch (error) {
            next(error);
        }
    }
    create = async(req,res,next)=>{
        try {
            const {body} = req.body
            return  res.send(await this.service.create(body))
        } catch (error) {
            next(error);
        }
    }
    update = async(req,res,next)=>{
        try {
            const {body} = req.body;
            const {id} = req.params;
            return  res.send(await this.service.update(id,body))
        } catch (error) {
            next(error);
        }
    }
    createMockUser = async(req,res,next)=>{
         try {
            let {cantUsers,cantPets} = req.params;
            console.log(cantUsers, "usuario chavalo");
            if(!cantPets) return res.send(await this.service.createMockUser(cantUsers))
            return  await this.service.createMockUser(cantUsers)
        } catch (error) {
            next(error);
        }
    }
}
export const userController = new UserController(userService);