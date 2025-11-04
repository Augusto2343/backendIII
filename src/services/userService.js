import mongoose from "mongoose";
import { userRepository } from "../repositories/user-repository.js";
import CustomError from "../utils/custom-error.js";
import { generateUserFaker, createHash } from "../utils/userUtils.js";

class UserService {
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
     * @returns {object} userRequired
     */
    getById= async(id)=>{
        try {
            const newUserId = new mongoose.Types.ObjectId(id);
            const user = await this.repo.getById(newUserId);
            if(!user || user == {}) throw new CustomError("Not found",404);
            return user;
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {number} cant 
     * @returns {Array} usersCreated
     */
    createMockUser = async(cant)=>{
        try{
            let cantidad=0;
            try{
                 cantidad = parseInt(cant);                 
            }catch(e){
                cantidad = 50;                
            }
            const arrayUsers =[]
            for (let i = 1; i <= cantidad; i++) {
                let data = generateUserFaker();
                console.log(data);
                let contrasenia = createHash(data.password);
                data.password =contrasenia
                arrayUsers.push(data)
            }
            return await this.repo.create(arrayUsers)
        }catch(e){
            throw e;
        }
    }
    /**
     * 
     * @param {object} body 
     * @returns {object} newUser
     */
    create= async(body)=>{
        try {
            if (!body.password  || !body.first_name || !body.email) throw new CustomError("Datos inexistentes",400);
            let role = body.role
            if(role != "admin" && role != "user") role = "user"
            return await this.repo.create({
                first_name:body.first_name,
                email:body.email,
                password:createHash(body.password),
                role:role
            })
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {string} id 
     * @param {object} body 
     * @returns {object} userModified
     */
    update= async(id,body)=>{
        try {
            if(!id || !body) throw  new CustomError("Faltan datos",400);;
            const newUserId = new mongoose.Types.ObjectId(id);
            return await this.repo.update(newUserId,body)
        } catch (error) {
            throw error            
        }
    }
    /**
     * 
     * @param {string} id 
     * @returns {object} userDeleted
     */
    delete= async(id)=>{
        try {
            return await this.repo.delete(id)
        } catch (error) {
            throw error           
        }
    }
}
export const userService = new UserService(userRepository)