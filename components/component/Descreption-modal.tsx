
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function DescreptionModal({descreption}:{descreption:string, id:string}) {
  return (
    <Dialog  >
      <DialogTrigger type="button" asChild>
        <Button type="button" variant="outline">رؤية التفاصيل</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 md:p-8 flex flex-col items-center justify-center gap-6 bg-white">
        <div className="grid gap-4 text-center">
          <DialogTitle className="text-2xl md:text-3xl font-bold"> </DialogTitle>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {descreption}
          </p>
          <DialogClose type="button">
            <Button size="lg">غلق</Button>
            </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}