import axiosInstance from "@/lib/axios";
import getBaseUrl from "@/lib/baseURL";
import { IMeeting } from "@/models/meeting";
import axios from "axios";

const oldcreateMeeting = async (req: IMeeting) => {
    try {
    const domain = getBaseUrl();
    const url = `${domain}/api/createRequest`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_req:req ,type:'MEETING'}),
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
        error: error.message || 'An error occurred while creating the meeting',
      };
    }
  };
  const createMeeting = async (meet: IMeeting) => {
    const domain = getBaseUrl();
    const url = `${domain}/api/createRequest`
    const response = await axiosInstance.post(url, {
        body: JSON.stringify({_req:meet ,type:'MEETING'}),
      })
    return response.data;
  };
  
export default createMeeting;
  