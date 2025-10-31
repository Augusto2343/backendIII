import mongoose from "mongoose"
import config from "../config/config.js"
import { initMongoDB } from "../config/db-connection.js"
import { expect } from "chai"
import request from "supertest"
import app from "../server.js";
import { generateUserFaker } from "../utils/userUtils.js"
import { generatePetFaker } from "../utils/petUtils.js"

const urls = {
    mocks:"/api/mocks",
    pets:"/api/pets",
    users:"/api/users"
}

describe("Testing endpoints api", () =>{

    describe("Testing api users", () =>{

        it("Probando el método GET ", async () =>{
            const response = await request(app).get(`${urls.users}/`);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("array");

        })
        it("Probando el método POST ", async () =>{
            const usrTest = generateUserFaker();
   
            const response = await request(app).post(`${urls.users}/`).send(usrTest)
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.have.property("first_name").to.be.equal(usrTest.first_name);
            expect(response.body).to.have.property("email").to.be.equal(usrTest.email);
            expect(response.body).to.have.property("role").to.be.equal(usrTest.role);
            // Note: password will be hashed, so we don't check the exact value
            console.log(response.body);
            
        })
        it("Probando el método PUT", async() =>{
            let usrTest = generateUserFaker();
            const usr = await request(app).post(`${urls.users}/`).send(usrTest);
            expect(usr.ok).to.be.equal(true);
            expect(usr.body).to.be.an("object");

            usrTest.first_name="Pepito";

            const response = await request(app).put(`${urls.users}/${usr.body._id}`).send(usrTest);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("first_name").to.be.equal(usrTest.first_name);
            expect(response.body).to.have.property("email").to.be.equal(usrTest.email);
        })
        it("Probando el método GET by ID", async() =>{
            let usrTest = generateUserFaker();
            const usr = await request(app).post(`${urls.users}/`).send(usrTest);
            expect(usr.ok).to.be.equal(true);
            expect(usr.body).to.be.an("object");

            const response = await request(app).get(`${urls.users}/${usr.body._id}`);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("first_name").to.be.equal(usrTest.first_name);
            expect(response.body).to.have.property("email").to.be.equal(usrTest.email);
        })
        
        it("Testeando el método DELETE", async() =>{
            
            const usrData = generateUserFaker();

            const usr = await request(app).post(`${urls.users}/`).send(usrData);
            expect(usr.ok).to.be.equal(true);
            expect(usr.body).to.have.property("first_name").to.be.equal(usrData.first_name);
            expect(usr.body).to.have.property("email").to.be.equal(usrData.email);
            expect(usr.body).to.have.property("role").to.be.equal(usrData.role);

            expect(usr.body).to.have.property("_id");

            const deleteUsr = await request(app).delete(`${urls.users}/${usr.body._id}`);

            expect(deleteUsr.ok).to.be.equal(true);
            expect(deleteUsr.body).to.have.property("first_name").to.be.equal(usr.body.first_name);
            expect(deleteUsr.body).to.have.property("email").to.be.equal(usr.body.email);
            expect(deleteUsr.body).to.have.property("role").to.be.equal(usr.body.role);
            expect(deleteUsr.body).to.have.property("_id").to.be.equal(usr.body._id);

            const get = await request(app).post(`${urls.users}/${usr.body._id}`);
            expect(get.ok).to.be.equal(false);
            
            expect(get.body).to.not.have.property("first_name");
            expect(get.body).to.not.have.property("email");

            expect(get.body).to.not.have.property("_id");
        })
    })
    
    describe("Testing de mocks", () =>{

        it("Testeando mock users", async()=>{
                
            const response = await request(app).get(`${urls.mocks}/mockingusers/10`)
            
            
            expect(response.status).to.be.equal(201);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.equal(10);

        })
        it("Testeando mock pets", async()=>{
                
            const response = await request(app).get(`${urls.mocks}/mockingpets/10`)
            
            console.log("Testing mock pets prueba:",typeof(response.body.length),response.body.length,typeof(response.body));
            console.log(response.body);
            
            expect(response.status).to.be.equal(201);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.equal(10);

        })
        it("Testeando mocking data", async()=>{
                
            const response = await request(app).post(`${urls.mocks}/generatedata/10/10`)

            expect(response.status).to.be.equal(201);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("object");
            expect(response.body.users).to.be.an("array");
            expect(response.body.pets).to.be.an("array");

            expect(response.body.users.length).to.be.equal(10);
            expect(response.body.pets.length).to.be.equal(10);

        })
    })
    describe("Testeando api pets", () =>{
        it("Testeando el GET", async()=>{
            const response = await request(app).get(`${urls.pets}/`);

            expect(response.ok).to.be.equal(true);
            expect(response.body).to.be.an("array");
            
        })
        it("Testeando el método POST ", async() =>{
            const petData = generatePetFaker();
            const pet = await request(app).post(`${urls.pets}/`).send(petData);

            expect(pet.ok).to.be.equal(true);
            expect(pet.body).to.be.an("object");
            expect(pet.body).to.have.property("name").to.be.equal(petData.name);
            

        })
        it("Testeando el método PUT", async() =>{
            const petData = generatePetFaker();

            const pet = await request(app).post(`${urls.pets}/`).send(petData);
            expect(pet.ok).to.be.equal(true);
            expect(pet.body).to.have.property("name").to.be.equal(petData.name);
            expect(pet.body).to.have.property("_id");

            const petModified = await request(app).put(`${urls.pets}/${pet.body._id}`).send({"name":"pepito"});

            expect(petModified.ok).to.be.equal(true);
            expect(petModified.body).to.have.property("name").to.be.equal("pepito")
        })
        it("Testeando el método GET by ID", async () =>{
            
            const petData = generatePetFaker();

            const pet = await request(app).post(`${urls.pets}/`).send(petData);
            expect(pet.ok).to.be.equal(true);
            expect(pet.body).to.have.property("name").to.be.equal(petData.name);
            expect(pet.body).to.have.property("_id");

            const response = await request(app).get(`${urls.pets}/${pet.body._id}`);
            expect(response.ok).to.be.equal(true);
            expect(response.body).to.have.property("name").to.be.equal(pet.body.name);
            expect(response.body).to.have.property("_id").to.be.equal(pet.body._id);

        })
        it("Testeando el método DELETE", async() =>{
            
            const petData = generatePetFaker();

            const pet = await request(app).post(`${urls.pets}/`).send(petData);
            expect(pet.ok).to.be.equal(true);
            expect(pet.body).to.have.property("name").to.be.equal(petData.name);
            expect(pet.body).to.have.property("_id");

            const deletePet = await request(app).delete(`${urls.pets}/${pet.body._id}`);

            expect(deletePet.ok).to.be.equal(true);
            expect(deletePet.body).to.have.property("name").to.be.equal(pet.body.name);
            expect(deletePet.body).to.have.property("_id").to.be.equal(pet.body._id);

            const get = await request(app).post(`${urls.pets}/${pet.body._id}`);
            expect(get.ok).to.be.equal(false);
            
            expect(get.body).to.not.have.property("name");
            expect(get.body).to.not.have.property("_id");
        })
    })
})

