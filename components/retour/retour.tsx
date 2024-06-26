'use client'
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Session } from "next-auth"
import { useState } from "react"
import { PaginationPrevious, PaginationItem, PaginationNext, PaginationContent, Pagination, PaginationLink } from "@/components/ui/pagination"
import React from "react"
import { DashboardImageModal } from "../component/dashboard-image-modal"
import ConfirmDeletion from "../component/ConfirmDeletion-modal"
import DescreptionModal from "../component/Descreption-modal"
import { IRequest } from "@/models/request"
import { REQMEET } from "@/types/reqmeet"
import { IMeeting } from "@/models/meeting"
import SelectionOptions from "./SelectionOptions"
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
                            <TableCell className="max-w-10 overflow-hidden break-words whitespace-normal text-right" dir="ltr">
                              {(item as IMeeting).appointment}
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