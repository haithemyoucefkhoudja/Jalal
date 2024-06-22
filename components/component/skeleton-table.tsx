
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    
    <main className={`flex flex-col max-h-screen flex-grow overflow-hidden w-full`} dir="rtl">
    <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto ">
<div className="flex flex-col space-y-4">
    <Card className="border rounded-lg shadow-sm w-full">
    <CardHeader>
      <CardTitle>الطلبات</CardTitle>
      <div className="mt-2"><Skeleton className="h-4 w-[150px]" /></div>
    </CardHeader>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              

              <TableHead className="w-[100px]">المعرف</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead className="hidden md:table-cell">الايمايل</TableHead>
              <TableHead className="hidden md:table-cell">الوصف</TableHead>
              <TableHead className="hidden md:table-cell">الصور</TableHead>
              <TableHead className="hidden lg:table-cell">الحالة</TableHead>
              <TableHead className="hidden lg:table-cell">الوقت</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
    </div>
    </section>
    </main>
  )
}
