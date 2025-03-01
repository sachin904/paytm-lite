interface ButtonProps{
    label:string,
    onClick?:()=>void,
    w:string,
    id?:string
}

export function Button(props:ButtonProps){
    return<button  onClick={props.onClick} className={` w-${props.w} my-1 rounded-md h-8 bg-black text-white px-2  font-semibold  text-center`}>
      {props.label}
    </button>
}