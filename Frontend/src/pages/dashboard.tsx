import { useEffect, useState } from "react";
import { AppbarComponent } from "../components/dashboard components/appbarComponent";
import { BalanceComponent } from "../components/dashboard components/balanceComponent";

import { UserBox } from "../components/dashboard components/userBox";
import { BACKEND_URL } from "../config";
import axios from "axios";


export default function Dashboard(){
  const[balance,setBalance]=useState("");
  const [userName,setUsername]=useState("");
  useEffect(()=>{
      async function fetchBalance(){
    const response= await axios.get(BACKEND_URL+"/api/v1/account/balance",{
      headers:{"Authorization":localStorage.getItem("token")}
     })
     setBalance(response.data.balance);
     setUsername(response.data.user.firstName)
  }
     fetchBalance();
  },[])
    return<div>
       <AppbarComponent  userName={userName} />
      <div className="h-full w-full p-4 ">
        
         <BalanceComponent balance={balance}/>
         <UserBox>
           
         </UserBox>
          
       </div>
    </div>
    
}