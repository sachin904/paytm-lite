interface ButtonProps{
    label:string,
    onClick?:()=>void
}
export function Button(props:ButtonProps){
    return<button  onClick={props.onClick} className=" my-1 rounded-sm h-8 w-full bg-black text-white text-center font-semibold">
      {props.label}
    </button>
}