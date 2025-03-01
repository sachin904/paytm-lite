
import { Router } from "express";
import { Account } from "../db";
import { authMiddleware } from "../authmiddleware";
import mongoose from "mongoose";
export const AccountRouter= Router();

AccountRouter.get("/balance",authMiddleware,async function(req,res){
    
    const accounts= await Account.findOne({userId:req.userId}).populate("userId","firstName");
    res.json({
       balance:accounts?.balance,
       user:accounts?.userId
    })
})

AccountRouter.post("/transfer",authMiddleware,async function(req,res){
   
    const{to,amount}=req.body;
    const session= await mongoose.startSession();
    try{
    session.startTransaction();
    const account= await Account.findOne({userId:req.userId}).session(session);
    if(!account||account.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
            msg:"insufficient balance"
        })
        return
    }

    const toAccount=await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.json({msg:"invalid account"});
       return
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
   
    await session.commitTransaction();
    res.status(200).json({
       msg:"transaction successful"
    });
}
catch(e:any){
    await session.abortTransaction();
        res.status(500).json({ msg: "Something went wrong", error: e.message });
}
    
   

});
