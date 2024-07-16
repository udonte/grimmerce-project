import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.olumycosoft.com/emart/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
