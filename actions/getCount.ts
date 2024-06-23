import getBaseUrl from "@/lib/baseURL";
import { REQMEET } from "@/types/reqmeet";
export default async function getReqCount(type:REQMEET='REQUEST'){
  const domain = getBaseUrl();
  let url;

  if (type === 'REQUEST') {
    url = `${domain}/api/reqCount`;
  } else if (type === 'MEETING') {
    url = `${domain}/api/meetingCount`;
  } else {
    throw new Error('Invalid type. Please use "REQUEST" or "MEETING".');
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();  
}