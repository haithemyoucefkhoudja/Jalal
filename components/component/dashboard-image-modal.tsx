
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import {FileInfo} from "@/types/Media"
import FetchMedia from "@/actions/getMedia"
import classNames from "classnames"
export function DashboardImageModal({req_id, }:{req_id:string,}) {

  const [curr, setCurr] = useState(0);
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<null | string>(null);

  const [media, setMedia] = useState<FileInfo[] | null>(null);
  useEffect(()=>{
    if(!open)
      return;
    setError(null);
    let isMounted = true;
    FetchMedia(req_id)
    .then((res) => {
      if (isMounted) {
        if(res.error)
          return setError(res.error);
        setMedia(res.media);
      }
    })
    return () => {
      isMounted = false;
    };
  },[req_id, open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild type="button">
        <Button type="button" variant="outline" className=" rounded-lg">إفتح الصور</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white ">
        <DialogTitle>

        </DialogTitle>
        
        
        <div className="grid gap-6">
        {!error &&<div className="grid gap-4">
          { media && media.map((ele,index)=>{
            if(index == curr)
              return(<div className="relative">
              <Image
                key={ele.key}
                src={ele.url}
                alt={ele.name}
                width={800}
                height={500}
                className="rounded-lg object-contain w-full aspect-[16/10] "
              />
            </div>)
            
}
)}

<div className="flex gap-4 overflow-x-auto pb-2">
{ media && media.map((ele,index)=>{
  return (
    <Image
      key={ele.key}
      onClick={()=>{
        if(index !== curr)
        setCurr(index)
      }}
      src={ele.url}
      alt={ele.name}
      width={100}
      height={60}
      className={classNames({"rounded-md object-cover w-[100px] h-[60px] flex-shrink-0 cursor-pointer":true, "border-2 border-green-500":index==curr, "border-2 border-gray-700":index!==curr})}
    />
    )
}
)}
</div>
          </div>}
          {error && <div className="prose  flex justify-center items-center">
            <h3 className=" text-red-500">{error}</h3>
          </div>
          
          }       
          
        </div>
      </DialogContent>
    </Dialog>
  )
}
