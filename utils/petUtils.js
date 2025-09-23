import {faker} from "@faker-js/faker"
faker.location = 'es'
export const generatePetFaker = () =>{
   return{
      name:faker.person.fullName()
   }
}