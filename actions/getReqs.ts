import getBaseUrl from "@/lib/baseURL";
import { REQMEET } from "@/types/reqmeet";

export default async function getRequests(page:number, type:REQMEET='REQUEST'){
        const domain = getBaseUrl();
        let url;

        if (type === 'REQUEST') {
          url = `${domain}/api/requests`;
        } else if (type === 'MEETING') {
          url = `${domain}/api/meetings`;
        } else {
          throw new Error('Invalid type. Please use "REQUEST" or "MEETING".');
        }

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page }),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        return res.json();
}