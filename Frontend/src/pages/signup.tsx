import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function SignupPage(){
   const userNameRef=useRef<HTMLInputElement>(null);
   const firstNameRef=useRef<HTMLInputElement>(null);
   const lastNameRef=useRef<HTMLInputElement>(null);
   const passwordRef=useRef<HTMLInputElement>(null);
   const navigate=useNavigate();

   async function signup(){
    const userName=userNameRef.current?.value;
    const firstName=userNameRef.current?.value;
    const lastName=lastNameRef.current?.value;
    const password=passwordRef.current?.value;
    
   const res= await axios.post(BACKEND_URL+"/api/v1/user/signup",{
        userName,
        lastName,
        firstName,
        password
    })
     console.log(res.data);
     alert(res.data.msg);
     navigate("/signin");


   }

    return<div className="bg-gray-300 h-screen w-screen flex justify-center items-center bg-opacity-80">
       <div className="h-auto w-64 bg-white rounded-md p-4  ">
        <div className="font-bold text-2xl text-center w-full m-2 ">Sign Up </div>
        <div className="text-sm text-center text-slate-500">Enter your information to create an account</div>
        <Input type="text" reference={firstNameRef} placeholder={"john"} label={"First Name"}></Input>
        <Input type="text" reference={lastNameRef}  placeholder={"john"} label={"Last Name"}></Input>
        <Input type="text" reference={userNameRef} placeholder={"john123"} label={"UserName"}></Input>
        <Input type="password" reference={passwordRef} placeholder={""} label={"password"}></Input>
        <Button w="full" onClick={signup} label="Sign Up"></Button>
        <div className="text-sm text-center my-2">Already have an account?<Link className="underline" to={"/signin"}> Login</Link></div>
       </div>
    </div>
}