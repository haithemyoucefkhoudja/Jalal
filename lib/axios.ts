import axios from "axios";    
const axiosInstance = axios.create(({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
}))

export default axiosInstance;