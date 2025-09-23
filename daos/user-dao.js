import {UserModel} from "./models/userModel.js"
import MongoDao from "./mongo-dao.js"

class UserDao extends MongoDao{
    constructor(model){
        super(model);
    }

}
export const userDao = new UserDao(UserModel);