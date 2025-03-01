import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { UserIcon } from "../userIcon";


interface PaymentSendProps{
 
  firstName:string,
  lastName:string,
  id:string
}
export function PaymentSend(props:PaymentSendProps){
  const navigate=useNavigate();
  
    return<div className="flex justify-between gap-2 my-2">
                        <div className="flex"><UserIcon/><div className="text-2sm font-bold ml-2 ">{props.firstName}</div><div className="text-2sm font-bold ml-2 ">{props.lastName}</div></div>
                       <Button onClick={()=>{navigate("/send?to="+props.id+"&firstName="+props.firstName); }} w="" label="Send Money"></Button> 
                     </div>
}