import axios from "axios";

// Shared client for all backend requests.
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
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
      // Clear stale auth and send the user back to sign in.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
