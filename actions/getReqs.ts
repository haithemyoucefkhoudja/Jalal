import getBaseUrl from "@/lib/baseURL";

export default async function getRequests(page:number){
        const domain = getBaseUrl();
        const url = `${domain}/api/requests`
        const res =   await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page }),
        });
        return res.json() 
}