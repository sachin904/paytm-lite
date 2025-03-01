import axios from "axios";
import {  useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContents(filter:string){
   const[users,setUsers]=useState([]);
   useEffect(()=>{
    
    async function refresh(){
    axios.get(BACKEND_URL+"/api/v1/user/bulk",{
     headers:{
         "Authorization":localStorage.getItem("token")
     },
     params:{
         filter:filter
     }
 }
).then((response)=>{
     setUsers(response.data.user)
 })
}
refresh();
},[filter])

   return{users}

}

