
import {Dialog,  DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import deleteRequest from "@/actions/deleteRequest";
import { REQMEET } from "@/types/reqmeet";
import deleteMeeting from "@/actions/deleteMeeting";

export default  function ConfirmDeletion({req_id, type}:{req_id:string, type:REQMEET}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setIsLoading] = useState(false)
  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  useEffect(()=>{
    setError('')
  },[open])
  const router = useRouter()
  const deleteItem = async () => {
    setError('')
    setIsLoading(true)
    let res = null;
    if (type === 'REQUEST' as REQMEET) {
    res = await deleteRequest(req_id)
    }
    else if(type==='MEETING' as REQMEET)
    res = await deleteMeeting(req_id)
    else
    {
      setError('Type Not Found')
      return;
    }

    if(!res.success)
      {
        setIsLoading(false);
        setError(res.error)
        return 
      }
    router.refresh()
    setIsLoading(false)
    setOpen(false)
  }
  return (
    <>
    
    <Button onClick={openModal} variant="destructive" >حذف</Button>
    <Dialog  onOpenChange={setOpen} open={open}>      
      <DialogContent className="sm:max-w-[425px] bg-white">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <TriangleAlertIcon className="h-8 w-8 text-red-500" />
          <div className="space-y-2 text-center">
            <DialogTitle>حذف عنصر</DialogTitle>
            <DialogDescription>
                هل أنت متأكد أنك تريد حذف هاذا العنصر؟
            </DialogDescription>
            <DialogDescription>
                {error && <p className="text-red-500">{error}</p>}
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className=" inline-flex justify-center  w-full ">
            <DialogClose  type="button">
                <Button variant="outline" type="button">إلغاء</Button>
            </DialogClose>
            <Button variant="destructive" className="disabled:pointer-events-none disabled:opacity-50"  type="button" onClick={()=>deleteItem()}>{loading?
            (
            <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit] "/>) :
            (<span> تأكيد الحذف</span>)}

            </Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
    </>
  )
}

function TriangleAlertIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}