import CustomError from "../utils/custom-error.js";
import { httpResponse } from "../utils/http-response.js";

export const errorHandler = (error,req,res,next) =>{
    console.error(error);
    if(error instanceof CustomError) return httpResponse.CustomErr(res,error);
    return httpResponse.ServerErr(res,error);
}