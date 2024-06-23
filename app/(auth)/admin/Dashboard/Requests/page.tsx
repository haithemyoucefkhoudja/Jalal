import getReqCount from "@/actions/getCount";
import getRequests from "@/actions/getReqs";
import { Retour } from "@/components/retour/retour";
import { getServerSession } from "@/utils/getServerSession";


  interface SearchParams {
    page?:string;
    id?: string;
    count?:string
  }
  
  interface PageProps {
    searchParams: SearchParams;
  }
export default async function Dashboard({ searchParams }: PageProps) {
    const session = await getServerSession()
    if(!session)
        return <></>
    
    const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    let count = 0
    if(typeof searchParams.count !== 'string') {
            const res = await getReqCount()
            count = res.count
    }
    else count = Number(searchParams.count);
    const {requests } = await getRequests(page)
    return(
    <div className="flex flex-col space-y-4">
            <Retour session={session} count={count} requests={requests} page={page}/>
    </div>
    )
}
    {/*
      <main className={`flex flex-col max-h-screen flex-grow overflow-hidden w-full`}>
        <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto ">
    <div className="flex flex-col space-y-4">
            <Retour session={session} count={count} requests={requests} page={page}>
            </Retour>
    </div>
    </section>
    </main>*/}