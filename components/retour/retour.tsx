'use client'
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Session } from "next-auth"
import { useRef, useState } from "react"
import Link from "next/link"
import { PaginationPrevious, PaginationItem, PaginationNext, PaginationContent, Pagination, PaginationLink } from "@/components/ui/pagination"
import { Loading } from "../ui/buttonLoading"
import { X } from "lucide-react"
import React from "react"
import {  RequestStatus } from "@/types/request"
import { DashboardImageModal } from "../component/dashboard-image-modal"
import ConfirmDeletion from "../component/ConfirmDeletion-modal"
import DescreptionModal from "../component/Descreption-modal"
import { IRequest } from "@/models/request"
import { Button } from "../ui/button"
import { REQMEET } from "@/types/reqmeet"
import { IMeeting } from "@/models/meeting"
// Function to format the date
const formatDate = (dateString:string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as any;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to format the time
const formatTime = (dateString:string) => {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' } as any;
  return new Date(dateString).toLocaleTimeString(undefined, options);
};
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
function SelectionOptions({request, type='REQUEST'}:{request:IRequest, type:REQMEET}) {
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

const groupByDate = (items: IRequest[]): Record<string, (IRequest | IMeeting)[]> => {
  if (!items) return {};
  return items.reduce((groups: Record<string, (IRequest | IMeeting)[]>, item) => {
    const date = formatDate((item as IRequest).createdAt.toString());
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};
export function Retour({session, requests, meetings, count, page, type='REQUEST'}:{session:Session, requests?:IRequest[], meetings?:IMeeting[], count:number, page:number, type?:REQMEET}){
  
  const [ImgModalOpen, setImgModalOpen] = useState(false)
  const limit = 20;
  const [batch, setBatch] = useState(Math.floor(page / 10 + 1));
  const itemsPerPage = 10;
  const totalP = Math.ceil(count / limit);
  const totalBatches = Math.ceil(totalP / itemsPerPage);
  const items = type === 'REQUEST' ? requests : meetings;
  const groupedItems = groupByDate(items as IRequest[] || []);

  return (
    <section className="w-full ">
      <Card dir="rtl" className=" pb-10 ">
        <CardHeader>
          <CardTitle>{type === 'REQUEST' ? 'الطلبات' : 'المواعيد'}</CardTitle>
          <CardDescription>{session.user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full  pb-20  ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المعرف</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الايمايل</TableHead>
                  <TableHead>الوصف</TableHead>
                  {type === 'REQUEST' && <TableHead>الصور</TableHead>}
                  {type === 'MEETING' && <TableHead>الموعد</TableHead>}
                  <TableHead>الحالة</TableHead>
                  <TableHead>الوقت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className=" pb-9">
                {Object.entries(groupedItems).map(([date, itemsForDate], index) => {
                  return (
                    <React.Fragment key={`date-row-${index}-frag`}>
                      <TableRow key={`date-row-${index}`}>
                        <TableCell colSpan={8} className="text-center">
                          {formatDate(date)}
                        </TableCell>
                      </TableRow>
                      {itemsForDate.map((item, trindex) => (
                        <TableRow key={`item-${index}-${trindex}`}>
                          <TableCell className="font-medium max-w-10 overflow-hidden break-words whitespace-normal">
                            <span
                              className="hover:italic hover:underline"
                              
                            >
                              {item._id}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
                            {item.name}
                          </TableCell>
                          <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
                            {item.email}
                          </TableCell>
                          
                            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
                              <DescreptionModal descreption={item.descreption} id={item._id} />
                            </TableCell>
                          
                          {type === 'REQUEST' &&
                            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
                                <DashboardImageModal   req_id={item._id} />
                            </TableCell>
                          }
                          {type === 'MEETING' &&
                            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
                              {((item as IMeeting).appointment).toLocaleString()}
                            </TableCell>
                          }
                          <TableCell>
                            <SelectionOptions request={item as IRequest} type={type} />
                          </TableCell>
                          <TableCell>{formatTime(item.createdAt.toString())}</TableCell>
                          <TableCell>
                            <ConfirmDeletion type={type} req_id={item._id} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="mt-6 flex justify-center w-full " dir="ltr">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setBatch(prev => prev - 1)}
                  disabled={batch === 1 || count === 0}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(totalP - ((batch - 1) * 10), 10) }, (_, i) => (i + (batch - 1) * 10) + 1).map((page_index) => (
                <PaginationItem key={page_index}>
                  <PaginationLink className={page === page_index ? 'border-2 ' : ''} href={`/admin/Dashboard/${type=='REQUEST'?'Requests':'Meetings'}?page=${page_index}&count=${count}`} disabled={page === page_index}>
                    {page_index}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setBatch(prev => prev + 1)}
                  disabled={batch === totalBatches || count === 0}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </section>
  )
}