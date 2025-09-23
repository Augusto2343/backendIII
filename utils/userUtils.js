import bcryptjs from "bcryptjs"
import {faker} from "@faker-js/faker"
import config from "../config/config.js"
faker.location = 'es'
export const createHash = (password) =>{
   return bcryptjs.hashSync(password, bcryptjs.genSaltSync(9))
}


export const generateUserFaker = () =>{
   return{
      first_name:faker.person.fullName(),
      email:faker.internet.email(),
      password:createHash(config.PASSWORD_USER),
      role:faker.helpers.arrayElement(['user','admin'])
   }
}