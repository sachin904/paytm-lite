import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";


export function authMiddleware(req:Request,res:Response,next:NextFunction){
   const token=req.headers["authorization"];
   const decode= jwt.verify(token as string,JWT_SECRET)
   if(!decode){
    res.status(403).json({
      msg:"you are not logged in"
     })
     return
    
   }
   else{
    if(typeof decode==="string")
      {
        res.status(403).json({
          msg:"you are not logged in"
        })
      }
       req.userId=(decode as JwtPayload).id;
       next();
   }
 
  
}