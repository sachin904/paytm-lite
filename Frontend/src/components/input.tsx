/* eslint-disable @typescript-eslint/no-explicit-any */


interface InputProps{
    placeholder:string,
    label?:string,
    reference:any

}
export function Input({placeholder,label,reference}:InputProps){
   
    return<div className="my-2">
            <p  className="text-sm  ">{label}</p>
            <input ref={reference} type ="text" placeholder={placeholder} className="border-2 border-slate-300 w-full px-1 my-1"></input>
        </div>
}