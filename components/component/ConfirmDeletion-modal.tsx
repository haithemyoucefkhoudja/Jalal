/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KZ7B5HjfOn7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ConfirmDeletion() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="destructive">حذف</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <TriangleAlertIcon className="h-8 w-8 text-red-500" />
          <div className="space-y-2 text-center">
            <DialogTitle>حذف عنصر</DialogTitle>
            <DialogDescription>
                هل أنت متأكد أنك تريد حذف هاذا العنصر؟
            </DialogDescription>
          </div>
        </div>
        <DialogFooter className=" inline-flex justify-center  w-full ">
            <Button variant="outline">إلغاء</Button>
            <Button variant="destructive">تأكيد الحذف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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