require("dotenv").config(); 
import express, { application } from "express";
import { Schema, string, z } from "zod";
import bcrypt from "bcrypt";
import mongoose, { ObjectId } from "mongoose";
import { Account, User } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Router } from "express";
import { authMiddleware } from "../authmiddleware";
export const UserRouter=Router();

UserRouter.use(express.json());


UserRouter.post("/signup", async function(req, res) {
    const userBody = z.object({
        userName: z.string().min(3).max(30),
        password: z.string().min(6).max(30),
        firstName: z.string().min(3).max(30),
        lastName: z.string().min(3).max(30)
    }) 

    const parseDataWithSuccess = userBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
         res.status(401).json({
            msg: "invalid input",
            error: parseDataWithSuccess.error
        })
        return ;
    }

    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let errorThrown = false;
    let accountBalance;

    try {
   

        const hashedPassword =await  bcrypt.hash(password, 5);
        console.log(hashedPassword);
        const user= await User.create({
            userName: userName,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

    const userId=user._id;
    
   const account= await Account.create({
        userId:userId,
        balance: Math.floor(Math.random()*10000)+1
 })
   accountBalance=account.balance;
    }
        catch (e) {
            errorThrown=true;
            
         res.status(409).json({
                msg: "user already exists",
              
            })
           
        }
        
         if (!errorThrown) {
            res.status(200).json({
                msg: "you are signed up",
                balance:accountBalance
        });
        }
});

UserRouter.post("/signin",async function (req, res) {
 const userBody2= z.object({
    userName:z.string().min(3).max(30),
    password:z.string().min(6).max(30)
 })
 const parseDataWithSuccess=userBody2.safeParse(req.body);
 if(!parseDataWithSuccess.success){
    res.json({
       msg:"invalid input",
       error:parseDataWithSuccess.error
       
    })
    return;
 }
 const userName=req.body.userName;
 const password=req.body.password;

 try{
 const user= await User.findOne({
    userName
 })
 
 if(!user){
    res.status(404).json({
        msg:"user not found"
         })
         return 
 }
 const  passwordMatch= await bcrypt.compare(password,user.password);
 if(passwordMatch){
    const token=jwt.sign({id:user._id},JWT_SECRET);
    res.status(200).json({
        token:token,
        msg:"you are signed in"
    })
}
    else{
        res.status(401).json({
          msg:"wrong password"
        })
    }
}
catch(e){
     res.json({
     msg:"internal server error"
    })
}
 
})

UserRouter.put("/updateUser",authMiddleware, async function (req, res) {
    const updateBody=z.object({
        userName:z.string().min(3).max(30).optional(),
        password:z.string().min(6).max(30).optional(),
        firstName:z.string().min(3).max(30).optional(),
        lastName:z.string().min(3).max(30).optional()
    })
   
    const parseDataWithSuccess=updateBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.json({
            msg:"invalid input",
            error:parseDataWithSuccess.error
        })
        return
    }
 const {userName,password,firstName,lastName}=req.body;
    
    try{
       if(userName){
        const userCheck= await User.findOne({userName});
        if(userCheck){
            res.json({
                msg:"userName already exists try another userName"
            })
            return;
        }
    }
    const hashedPassword=password?await bcrypt.hash(password,5):undefined; 

    
    
    const userId=req.userId;
    await User.updateOne({_id:userId},
        {
            userName,
            password:hashedPassword,
            firstName,
            lastName
        }
    )

    res.status(200).json({
         msg:"user update",
        
    })
    return;
   }
catch(e){
    res.status(500).json({
        msg:"error while updating user Information"
    })
}

})

UserRouter.get("/bulk",authMiddleware,async function(req,res){
    const filter=req.query.filter||"";
    try{
    const users= await User.find({
        $or:[
            {firstName:{"$regex":filter,"$options":"i"}},
            {lastName:{"$regex":filter,"$options":"i"}}
        ]
    })
    if(users.length==0){
        res.status(404).json({
           msg:"no user found matching the search criteria"
        })
        return
    }
    
    res.json({
        user:users.map(user=>({
           userName:user.userName,
           firstName:user.firstName,
           lastName:user.lastName,
           _id:user._id
        }))
    })
}
catch(e){
    res.status(500).json({
        msg:"error in searching for user"
    })
}
})

