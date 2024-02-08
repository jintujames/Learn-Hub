import axios, { AxiosRequestConfig } from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: "http://localhost:5173/",
  });
  

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => {
      if (response?.data?.message === "jwt expired") {
        localStorage.removeItem(`Token`);
        window.location.replace(`/api/v1/student/login`);
      }
      return response;
    },
    (error) => {
      console.error(error);
      if (error?.response?.data?.message === "jwt expired") {
        localStorage.removeItem(`Token`);
        window.location.replace(`/api/v1/student/login`);
      }
      return Promise.reject(error);
    }
  );
  

// Export the Axios instance for use in other parts of your application
export default axiosInstance;


