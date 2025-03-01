
interface BalancProps{
    balance:string
}
export function BalanceComponent({balance}:BalancProps){
   
    return  <div className="flex justify-start ">
    <div className="text-xl font-bold  ">Your Balance </div>
    <div className="text-md font-bold text-center ml-5 p-1">${balance} </div>
   </div>
}