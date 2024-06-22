import getBaseUrl from "@/lib/baseURL";

export default async function getReqCount(){
    const domain = getBaseUrl();
  const url = `${domain}/api/reqCount`
  const postexist =   await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
      return postexist.json()
  
}