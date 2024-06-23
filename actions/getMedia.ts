import getBaseUrl from "@/lib/baseURL";

export default async function FetchMedia(req_id:string) {
    const domain = getBaseUrl();
    const url = `${domain}/api/media`
    const res =   await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ req_id }),
      
    });
    return res.json() 
}