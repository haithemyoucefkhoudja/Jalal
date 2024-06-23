import getBaseUrl from "@/lib/baseURL";
import { IRequest } from "@/models/request";

const createRequest = async (req: IRequest) => {
    try {
    const domain = getBaseUrl();
    const url = `${domain}/api/createRequest`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_req:req, type:'REQUEST'}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return {
        success: true,
        data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: null,
        error: error.message || 'An error occurred while creating the request',
      };
    }
  };
  
export default createRequest;
  