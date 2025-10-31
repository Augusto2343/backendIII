import {connect} from "mongoose";
import config from "./config.js";

export const initMongoDB = async(db)=>{
        try {
            if(db == "testing"){
                await connect(config.TEST_MONGO_URL)
            }
            else{
                console.log(config.MONGO_URL);
                
                await connect(config.MONGO_URL, {
                    serverSelectionTimeoutMS:300000,
                });
            }
        } catch (error) {
            throw new Error(error);
        }
}
