import {  useNavigate, useSearchParams } from "react-router-dom";

import { UserIcon } from "../components/userIcon";

import { Button } from "../components/button";
import {  useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export default function SendMoneyPage(){
    const [amount, setAmount] = useState(0);
     const [searchParams]=useSearchParams();
     const to= searchParams.get("to");
     const firstName=searchParams.get("firstName");
     const navigate=useNavigate();
     
   async  function makePayment(){
        try{
        const res= await axios.post(BACKEND_URL+"/api/v1/account/transfer",{
            to,amount
        },{
            headers:{"Authorization":localStorage.getItem("token")}
        });
       alert(res.data.msg);
       console.log(res.data.msg);
       navigate("/Dashboard");
    }
    catch(e){
        console.error("Payment failed:", e);
        if (axios.isAxiosError(e)) {
            alert(e.response?.data?.msg || "Transaction failed. Please try again.");
        } else {
            alert("An unexpected error occurred.");
        }
    }
       
     }
     
    return<div className="bg-gray-300 h-screen w-screen flex justify-center items-center bg-opacity-80">
       <div className="h-auto w-72 bg-white rounded-md p-4  ">
        <div className="font-bold text-2xl text-center w-full m-2 ">Send Money </div>
        <br/>
        <div className="flex justify-start"><UserIcon></UserIcon> <div className="text-xl font-bold  ">{firstName} </div></div>
        <div className="text-sm font-semibold ml-2 ">Amount (in Rs)</div>
        <input type="number"  onChange={(e) => {
                            setAmount(Number(e.target.value));
                        }}  placeholder="Enter amount" className="border-2 border-slate-300 w-full px-1 my-1"></input>
        <Button w="full" label="initiate payment" onClick={makePayment} ></Button>
       </div>
    </div>
}