
import { Router } from "express";
import { authMiddleware } from "../authmiddleware";
import { AccountRouter } from "./account";
export const indexRouter =Router();

indexRouter.use("/account",AccountRouter);
indexRouter.post("/me",authMiddleware ,async function(req,res) {
  res.json({
    msg:"hello"
  })
})