import axios, { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosEnd";

export const api = axios.create({
  baseURL: "http://localhost:4001/",
  timeout: 5000,
  withCredentials: true,
});

export const apiRequest = async (config: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance(config);    
    return response;
  } catch (error) {
    console.error(error, "errr");
    return error;
  }
};

export const headerConfg = () => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    return {
      Authorization: ` Bearer ${token}`,
    };
  }
};
