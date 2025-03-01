
import {  useState} from "react"

import { PaymentSend } from "./paymentSend";
import { useContents } from "../../hooks/useContents";
export function UserBox(){
  const [filter,setFilter]=useState("");
    const{users}=useContents(filter);
   
    return<div>
         <div className="text-xl font-bold my-6 ">Users</div>
           <input onChange={(e)=>{setFilter(e.target.value); }} className="w-full border-[2px] border-gray-200 px-2" placeholder="search users..."></input>
           <div className="my-4">
           {users.map(({firstName,lastName,_id})=><PaymentSend id={_id} key={_id} firstName={firstName} lastName={lastName}/>) }
           </div>
    </div>
}