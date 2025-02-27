require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import { Mongo_URL } from "./config";
import { UserRouter } from "./routes/user";
import { indexRouter } from "./routes/index";
import cors from "cors";
declare global{
    namespace Express{
        export interface Request{
            userId?:string;
        }
    }
}

const app =express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",UserRouter);
app.use("/api/v1",indexRouter)

async function main(){
    await mongoose.connect(Mongo_URL);
    app.listen(3001);
    console.log("listening on port 3001");
}
main();