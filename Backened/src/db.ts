
import mongoose,{ObjectId, Types} from "mongoose";

import { Mongo_URL } from "./config";
mongoose.connect(Mongo_URL);
const Schema= mongoose.Schema;


const UserSchema= new mongoose.Schema({
    userName:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true}
})

const AccountSchema= new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,required:true,ref:"users"},
    balance:{type:Number,required:true,default:0}
});

export const User=mongoose.model("users",UserSchema);
export const Account=mongoose.model("Accounts",AccountSchema);



