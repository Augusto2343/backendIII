import { PetModel } from "./models/petModel.js";
import MongoDao from "./mongo-dao.js"

class PetDao extends MongoDao{
    constructor(model){
        super(model);
    }

}
export const petDao = new PetDao(PetModel);