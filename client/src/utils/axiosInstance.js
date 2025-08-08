import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/wt" : "/wt";

// re-usable instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Backend URL

  withCredentials: true, // using cookies
});

export default axiosInstance;
