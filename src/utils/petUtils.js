import {faker} from "@faker-js/faker"
faker.location = 'es'
/**
 * 
 * @returns {object} pet
 */
export const generatePetFaker = () =>{
   return{
      name:faker.person.fullName()
   }
}