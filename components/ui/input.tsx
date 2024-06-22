import * as React from "react"

import { EyeIcon, EyeOffIcon } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showHideState, setshowHideState] = React.useState(false)
    const viewMode = type === 'password' ?  true : false
    return (
      <div className="flex w-full items-center border-gray-200 bg-white">
      <input
        type={showHideState ? 'Text' : type}
        className={" flex-grow h-10 px-3 py-2 text-sm focus:none outline-none  placeholder:text-gray-500 ".concat(className || '')}
        ref={ref}
        {...props}
      />
      {viewMode &&      
      <button
      type="button"
      onClick={(e)=>{
        e.preventDefault()
        setshowHideState(prev=> !prev)}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
      {
       showHideState ?  
       <EyeIcon/>
       : <EyeOffIcon/>}
      </button>
      }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
