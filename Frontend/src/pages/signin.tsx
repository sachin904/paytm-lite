import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

export default function SigninPage(){
    const userNameRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
    async function signin() {
        const userName=userNameRef.current?.value;
        const password=passwordRef.current?.value;
        const res=await axios.post(BACKEND_URL+"/api/v1/user/signin",
            {
               userName,
               password
             }
         )
         
        console.log(res.data);
        alert(res.data.msg);
        await localStorage.setItem("token",res.data.token);
        navigate("/Dashboard")

    }
    return<div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
        <div className="bg-white h-auto w-64 rounded-md p-4 ">
            <div className="text-center font-bold text-2xl w-full ">Sign In</div>
            <div className="text-sm text-slate-500 text-center">Enter your credential to access your account</div>
            <Input  type="text" reference={userNameRef} placeholder="john123" label="username"></Input>
            <Input type="password" reference={passwordRef} placeholder="password" label="password"></Input>
            <Button w="full" onClick={signin} label="Sign In"></Button>
            <div className="text-sm  text-center">Don't have an account? <Link className="underline" to={"/signup"}> Sign Up</Link></div>
            
        </div>
       
    </div>
}