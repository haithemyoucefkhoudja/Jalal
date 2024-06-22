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
import { IRequest, RequestStatus } from "@/types/request"
import { DashboardImageModal } from "../component/dashboard-image-modal"
import ConfirmDeletion from "../component/ConfirmDeletion-modal"
import DescreptionModal from "../component/Descreption-modal"
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
function SelectionOptions({request}:{request:IRequest}) {
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
      const response = await fetch(`/api/retour/update-status/${request.id}`,
      {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json' 
      },
      body: JSON.stringify({newStatus:option})
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
  key !== 'not-treated' &&
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
const groupByDate = (requests: IRequest[]): Record<string, IRequest[]> => {
  return requests.reduce((groups: Record<string, IRequest[]>, request) => {
    const date = formatDate(request.createdAt.toString());
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(request);
    return groups;
  }, {});
};
export function Retour({session, requests, count, page}:{session:Session, requests:IRequest[], count:number, page:number}){
 {/* const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(Math.min(count, 10))
  const [searchTerm, setSearchTerm] = useState("")
*/}
  const limit = 20;
  const [batch, setBatch] = useState(Math.floor(page / 10 + 1));
  const itemsPerPage = 10;
  const totalP = Math.ceil(count / limit);
  const totalBatches = Math.ceil(totalP / itemsPerPage);
  const [isOpen, setIsOpen] = useState(false);  
    const togglePopup = () => {
      setIsOpen(!isOpen);
  };
  const groupedrequests = groupByDate(requests);
  {/*const filteredData = requests.filter((row) => {
    const searchTerms = search.split(',').map((term) => term.trim());
    return searchTerms.every((term, index) => {
      switch (index) {
        case 0:
          return row.createdAt.toString().includes(term);
        case 1:
          return row.PageName.includes(term);
        case 2:
          return row.status.includes(term);
        case 3:
          return row.uniqueId.includes(term);
        case 4:
          return row.Ip.includes(term);
        default:
          return true;
      }
    });
  });*/}
    return(
    <section className="w-full ">
  <Card dir="rtl" className=" pb-10 ">
    <CardHeader>
      <CardTitle>الطلبات</CardTitle>
      <CardDescription>{session.user?.email}</CardDescription>
    </CardHeader>
    {/*<div className="flex items-center gap-2 px-4 my-4">
        <div className="flex border-2 border-gray-500 rounded-md  mx-4">
            <Input
              placeholder="البحث"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="flex justify-center items-center ml-4">  
            <SearchIcon  className="w-4 h-4 hover:stroke-gray-700/90 stroke-gray-900" />
            </button>
        </div>
        <div className="flex-1">

        </div>
        <div className=" w-20">
          <Select value={pageSize.toString()}    onValueChange={(e) => setPageSize(Number(e))}>
            <SelectTrigger>
              <SelectValue>{pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 </SelectItem>
              <SelectItem value="20">20 </SelectItem>
              <SelectItem value="50">50 </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>*/}
    <CardContent>
    
      
  <div className="relative w-full  pb-20  ">
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead>المعرف</TableHead>
            <TableHead>الاسم</TableHead>
            <TableHead>الايمايل</TableHead>
            
            <TableHead>الوصف</TableHead>
            <TableHead>الصور</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الوقت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" pb-9">
        {Object.entries(groupedrequests).map(([date, requestsForDate], index) => {
  return (
    <React.Fragment key={`date-row-${index}-frag`}>
      <TableRow key={`date-row-${index}`}>
        <TableCell colSpan={8} className="text-center">
          {formatDate(date)}
        </TableCell>
      </TableRow>
      {requestsForDate.map((request, trindex) => (
          <TableRow key={`request-${index}-${trindex}`}>
            <TableCell className="font-medium max-w-10 overflow-hidden break-words whitespace-normal">
              <Link
                className="hover:italic hover:underline"
                onClick={togglePopup}
                href={{ query: { id: request.id, page: page, count: count } }}
                scroll={false}
              >
                {request.id}
              </Link>
            </TableCell>
            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
              {request.name}
            </TableCell>
            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
              {request.email}
            </TableCell>
            
            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
            <DescreptionModal descreption={request.description} id={request.id}/>
            </TableCell>
            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal">
              <DashboardImageModal req_id={request.id}/>
            </TableCell>
            <TableCell>
              <SelectionOptions request={request} />
            </TableCell>
            {/*<TableCell>
              <OrderButton order={JSON.parse(JSON.stringify(request.orderInfos))} />
            </TableCell>*/}
            <TableCell>{formatTime(request.createdAt.toString())}</TableCell>
            
            <TableCell><ConfirmDeletion></ConfirmDeletion></TableCell>
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
                onClick={() => setBatch(prev=>prev - 1)}
                disabled={batch === 1 || count == 0}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(totalP - ((batch - 1 ) * 10), 10) }, (_, i) => (i + (batch - 1 ) * 10) + 1).map((page_index) => (
              <PaginationItem key={page_index}>
                <PaginationLink className={page === page_index ? 'border-2 ': ''}  href={`/Dashboard?page=${page_index}&count=${count}`}   disabled={page === page_index}>
                  {page_index}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setBatch(prev=>prev + 1)}
                disabled={batch  == totalBatches || count == 0}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
 
  </Card>
   {/*isOpen && <Indicator isOpen={isOpen} count={count} updateState={()=>setIsOpen(false)} page={page}/>*/}
  </section>
    )
}