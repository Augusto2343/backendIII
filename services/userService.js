import { userRepository } from "../repositories/user-repository.js";
import { createHash, generateUserFaker } from "../utils/userUtils.js";

class UserService {
    constructor(repository){
        this.repo = repository;
    }
    getAll= async()=>{
        try {
            return await this.repo.getAll()
        } catch (error) {
            throw new Error(error)           
        }
    }
    getById= async(id)=>{
        try {
            const pet = await this.repo.getById(id);
            if(!pet) throw new Error("Not found");
            return pet;
        } catch (error) {
            throw new Error(error)            
        }
    }
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
                
                data.password = createHash(data.password)
                arrayUsers.push(data)
            }
            return await this.repo.create(arrayUsers)
        }catch(e){
            throw new Error(e);
        }
    }
    create= async(body)=>{
        try {
            if (!body.password  || !body.first_name || !body.email) throw new Error("Datos faltantes o incorrectos");
            let role = body.role
            if(role != "admin" || role !="user") role = "user"
            return await this.repo.create({
                first_name:body.first_name,
                email:body.email,
                password:createHash(body.password),
                role:role
            })
        } catch (error) {
            throw new Error(error)            
        }
    }
    update= async(id,body)=>{
        try {
            if(!id || !body) throw new Error("Faltan datos");
            return await this.repo.update(id,body)
        } catch (error) {
            throw new Error(error)            
        }
    }
    delete= async(id)=>{
        try {
            return await this.repo.delete(id)
        } catch (error) {
            throw new Error(error)           
        }
    }
}
export const userService = new UserService(userRepository)