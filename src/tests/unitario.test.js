import {expect} from "chai"
import { initMongoDB } from "../config/db-connection.js"
import { userDao } from "../daos/user-dao.js"
import mongoose from "mongoose"
import { petDao } from "../daos/pet-dao.js"
import { generatePetFaker } from "../utils/petUtils.js"
import { generateUserFaker } from "../utils/userUtils.js"

//Tests unitarios

describe( "Test unitarios del DAO de users", ()=>{
    before(async () =>{
        await initMongoDB("testing") 
                .then(async() =>{
                    console.log("✅ ¡Base de datos conectada!");
                    await mongoose.connection.collections["users"].drop();
                })
                .catch("❌ No se pudo conectar con la DB")
    })
    it("Debería obtener el array de usuarios", async () =>{
        const response = await userDao.getAll();
        expect(response).to.be.an("array");
        expect(response.length).to.be.equal(0);
    } )
    it("Debería agregar un usuario", async() =>{
        const pruebaUser ={
            first_name:"usuario",
            email:"usuario@example",
            password:"1234",
            role:"admin"
        }
        const response = await userDao.create(pruebaUser);

        expect(response).to.be.an("object");
        expect(response).to.have.property("_id");
        expect(response).to.have.property("first_name").to.be.equal("usuario");
        expect(response).to.have.property("email").to.be.equal("usuario@example");
        expect(response).to.have.property("password").to.be.equal("1234");
        expect(response).to.have.property("role").to.be.equal("admin");

    })
    it("Debería poder modificar un usuario", async () =>{
        const pruebaUser ={
            first_name:"usuario",
            email:"usuario@example2",
            password:"1234",
            role:"admin"
        }
        const agregarUsr = await userDao.create(pruebaUser);
        expect(agregarUsr).to.be.an("object");
        expect(agregarUsr).to.have.property("_id");
        
        const response = await userDao.update(agregarUsr._id,{first_name:"pepito"})
        expect(response).to.be.an("object");
        expect(response).to.have.property("first_name").to.be.equal("pepito");
    } )
    it("Debería poder obtener un usuario por su ID", async() =>{
        const pruebaUser ={
            first_name:"usuario",
            email:"usuario@example3",
            password:"1234",
            role:"admin"
        }
        const createUsr = await userDao.create(pruebaUser);
        expect(createUsr).to.be.an("object");
        expect(createUsr).to.have.property("_id");
        const getUsr = await userDao.getById(createUsr._id);
        expect(getUsr).to.be.an("object");
        expect(getUsr).to.have.property("first_name").to.be.equal("usuario");
        expect(getUsr).to.have.property("email").to.be.equal("usuario@example3");
        expect(getUsr).to.have.property("password").to.be.equal("1234");
        expect(getUsr).to.have.property("role").to.be.equal("admin");

    })
    it("Debería poder eliminar un usuario", async() =>{
        const pruebaUser ={
            first_name:"usuario",
            email:"usuario@example4",
            password:"1234",
            role:"admin"
        }
        const createUsr = await userDao.create(pruebaUser);
        expect(createUsr).to.be.an("object");
        expect(createUsr).to.have.property("_id");
        const deleteUsr = await userDao.delete(createUsr._id);

        
        expect(deleteUsr).to.be.an("object");
        expect(deleteUsr).to.have.property("email").to.be.equal(createUsr.email)
        const getUsr = await userDao.getById(createUsr._id);
       expect(getUsr).to.be.equal(null)
    })
})  
describe("Test unitarios al DAO de pets ",async () =>{
    before(async () =>{
        await initMongoDB("testing") 
                .then(async() =>{
                    console.log("✅ ¡Base de datos conectada!");
                    await mongoose.connection.collections["pets"].drop();
                })
                .catch("❌ No se pudo conectar con la DB")
    })
    it("Debería poder obtener las mascotas", async () =>{
        const response = await petDao.getAll();
         expect(response).to.be.an("array");
         expect(response.length).to.be.equal(0);
    })
    it("Debería poder agregar una mascota", async () =>{
        const petExample = {
            name:"Perrito ejemplo"
        }
        const response = await petDao.create(petExample);
        expect(response).to.be.an("object");
        expect(response).to.have.property("_id");
        expect(response).to.have.property("name").to.be.equal(petExample.name);
        expect(response).to.have.property("owner").to.be.equal("");
        expect(response).to.have.property("adopted").to.be.equal(false);


    })
    it("Debería poder modificar un mascota", async () =>{
        const mascotaExample ={
            name:"gatito"
        }
        const agregarMasc = await petDao.create(mascotaExample);
        expect(agregarMasc).to.be.an("object");
        expect(agregarMasc).to.have.property("_id");
        
        const response = await petDao.update(agregarMasc._id,{name:"Larry"})
        expect(response).to.be.an("object");
        expect(response).to.have.property("name").to.be.equal("Larry");
    } )
    it("Debería poder obtener un mascota por su ID", async() =>{
        const mascotaExample ={
            name:"Tortuguita ejemplo"
        }
        const createPet = await petDao.create(mascotaExample);
        expect(createPet).to.be.an("object");
        expect(createPet).to.have.property("_id");
        const getPet = await petDao.getById(createPet._id);
        expect(getPet).to.be.an("object");
        expect(getPet).to.have.property("name").to.be.equal("Tortuguita ejemplo");
    })
    it("Debería poder eliminar una mascota", async() =>{
        const mascotaExample ={
            name:"Max"
        }
        const createPet = await petDao.create(mascotaExample);
        expect(createPet).to.be.an("object");
        expect(createPet).to.have.property("_id");
        const deletePet = await petDao.delete(createPet._id);

        expect(deletePet).to.be.an("object");
        expect(deletePet._id.toString()).to.be.equal(createPet._id.toString())
        const getPet = await petDao.getById(createPet._id);
       expect(getPet).to.be.equal(null)
    })
})

describe("Tests de los mocks",() =>{
    it("Probando los mocks de las mascotas", async() =>{
        const petFaker = generatePetFaker();
        expect(petFaker).to.have.property("name").to.be.an("string")
    })
    it("Probando los mocks de los usuarios", async() =>{
        const usrFaker = generateUserFaker();
        
        expect(usrFaker).to.have.property("first_name").to.not.be.equal("")
        expect(usrFaker).to.have.property("email").to.not.be.equal("")
        expect(usrFaker).to.have.property("password").to.not.be.equal("")
        expect(usrFaker).to.have.property("role").to.not.be.equal("")

    })
})