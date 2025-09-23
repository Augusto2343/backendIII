import mongoose, {model} from "mongoose";
const PetSchema = new mongoose.Schema({
    name:{type:String,require:true},
    owner:{type:String,default:""},
    adopted:{type:String,default:false},
});

export const PetModel = model("pets",PetSchema)