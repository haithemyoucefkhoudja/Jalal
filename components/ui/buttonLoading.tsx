import { FC } from "react"

interface LoadingProps {
text?:string, 
isLoading:boolean
}
export const Loading: FC<LoadingProps> =   ({text, isLoading}) => {
    
    return(
        <div>
    {
      isLoading ?   
      <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]"/>
    : <>{text? text: ''}</>

}
</div>)
  }