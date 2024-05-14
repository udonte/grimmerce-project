import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.olumycosoft.com/emart/api/v1",
});

export default axiosInstance;
