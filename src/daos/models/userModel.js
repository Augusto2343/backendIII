import mongoose, { model } from "mongoose";

const UserSchema = mongoose.Schema({
    first_name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:{type:String,enum:["user","admin"],require:true},
})
export const UserModel = model("users",UserSchema);