import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://216.158.239.94:3002/api/v1",
});

export default axiosInstance;
