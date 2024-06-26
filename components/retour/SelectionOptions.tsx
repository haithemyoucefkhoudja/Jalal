import { REQMEET } from "@/types/reqmeet";
import { RequestStatus } from "@/types/request";
import { useRef, useState } from "react";
import { Loading } from "../ui/buttonLoading";
import { X } from "lucide-react";
import { IRequest } from "@/models/request";
const statusToTailwindClass = {
  "APPROVED": 'bg-green-500 text-white', 
  "REJECTED": 'bg-red-500 text-white', 
  "PENDING": 'bg-blue-500 text-white',
};
const statusToArabic = {
  "APPROVED": 'تم التواصل',
  "REJECTED": 'ملغى', 
  "PENDING": 'لم يتم معالجته',
};
export default function SelectionOptions({request, type='REQUEST'}:{request:IRequest, type:REQMEET}) {
  const Dropref = useRef<null | HTMLDivElement>(null)
  const Buttonref = useRef<null |HTMLButtonElement>(null);
  const [selectedOption, setselectedOption] = useState<RequestStatus>(request.status)
  const [isLoading, setIsLoading] = useState(false)
  const [showUpdate, setshowUpdate] = useState(false);
  function DropMenuEvent() {
    
    if(Dropref.current && Buttonref.current) {
      if (Dropref.current.style.display === 'none') {
        
        Dropref.current.style.display = 'block'
      } else {
        Dropref.current.style.display = 'none'; // Hide the dropdown
      }
      }
  }

 async function OptionEvent(option: RequestStatus): Promise<void> {
    setshowUpdate(false)
    if (request.status !== 'PENDING') return;
    try {
      const response = await fetch(`/api/update-status/${request._id}`,
      {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json' 
      },
      body: JSON.stringify({newStatus:option, type})
    }
    );
      if(response.status !== 200)
        throw new Error(response.statusText)
      setselectedOption(option);
      request.status = option; // Update request status locally
    } catch (error:any) {
      setselectedOption(request.status)
      console.error('Error updating status:', error);
    }

    if (Dropref.current) Dropref.current.style.display = 'none'; // Hide the dropdown
    setIsLoading(false)
  }
  if(request.status !== 'PENDING')
    return<span className={`h-10 rounded-md px-4 py-2 w-32  ${statusToTailwindClass[request.status]}`}>{statusToArabic[request.status]}</span>
  return(<>
  
  
  <button onClick={()=> DropMenuEvent()} type="button" 
  ref={Buttonref}
  className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none w-fit">
    {
      isLoading ? <Loading isLoading={isLoading}></Loading>:
      <>
        {statusToArabic[selectedOption]}
        <svg className=" h-4 w-4" fill="black" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </>
    }
</button>
<div ref={Dropref} className=" hidden absolute z-50 max-h-48  mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
{Object.entries(statusToArabic).map(([key, value]) => (
  key !== 'PENDING' &&
  <button   type="button" onClick={()=> {
    setshowUpdate(true)
    if(Dropref.current)
      Dropref.current.style.display = 'none'; // Hide the dropdown
    setIsLoading(true)
    setselectedOption(key as RequestStatus)}
  } key={key} value={key}  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-900" role="menuitem">{value}</button>
))}
  
</div>
{showUpdate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 " dir="rtl">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full overflow-auto">
            
          <button onClick={()=> {
            
            setshowUpdate(false)
            setIsLoading(false)
            setselectedOption(request.status)
          }}> <X className='w-6 h-6'/></button>
          <div className="flex p-4 items-center justify-center w-full ">
            <button onClick={()=>OptionEvent(selectedOption)} className="h-10 px-4 py-2 w-32 bg-green-400 text-gray-50 hover:bg-red-500/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"   type="button">
                        المواصلة
            </button>
          </div>
          </div>
        </div>
      )}
</>
      
      
)
}
