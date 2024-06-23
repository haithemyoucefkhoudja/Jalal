import getBaseUrl from "@/lib/baseURL";

const deleteRequest = async (id: string) => {
    try {
    const domain = getBaseUrl();
    const url = `${domain}/api/deleteRequest/${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
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
  
  export default deleteRequest;
  