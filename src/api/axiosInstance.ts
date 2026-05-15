import axios from "axios";
import { API_BASE_URL } from "../constants/apiUrls";

// Shared HTTP client for all backend requests.
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Attach the JWT so protected endpoints can authenticate the request.
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      localStorage.removeItem("userId");
      window.location.assign("/signin");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
