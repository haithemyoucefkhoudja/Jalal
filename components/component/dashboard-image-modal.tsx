
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import {FileInfo} from "@/types/Media"
import FetchMedia from "@/actions/getMedia"
import classNames from "classnames"
export function DashboardImageModal({req_id}:{req_id:string}) {
  const [curr, setCurr] = useState(0);
  const [error, setError] = useState<null | string>(null);

  const [media, setMedia] = useState<FileInfo[] | null>(null);
  useEffect(()=>{
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
  },[req_id])
  return (
    <Dialog >
      
      <DialogTrigger asChild>
        <Button variant="outline" className=" rounded-lg">إفتح الصور</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white ">
        <DialogTitle>{req_id}</DialogTitle>
        <div className="grid gap-6">
          <div className="grid gap-4">
          { media && media.map((ele,index)=>{
            if(index == curr)
              return(<div className="relative">
              <Image
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
      className={classNames({"rounded-md object-cover w-[100px] h-[60px] flex-shrink-0 cursor-pointer":true, "border-2 border-green-500":index==curr})}
    />
    )
}
)}
</div>
          </div>
          {error && <div className="prose">
            <h3 className=" text-red-500">{error}</h3>
          </div>
          }       
        </div>
      </DialogContent>
    </Dialog>
  )
}

function XIcon(props:any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
