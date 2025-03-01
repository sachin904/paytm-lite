import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { UserIcon } from "../userIcon";

interface appbarprops{
    userName:string
}
export function AppbarComponent({userName}:appbarprops){
    const navigate=useNavigate();
    return  <div className="h-15 w-full flex justify-between  p-4 border-b-2  border-gray-200">
    <div className="text-center font-bold text-2xl  ">Payment App</div>
    <div className="text-center flex justify-center items-center ">hello, {userName} <UserIcon/><Button w="md" label="Logout" onClick={()=>{localStorage.removeItem("token"); navigate("/signin")}}/></div>
   </div>
}