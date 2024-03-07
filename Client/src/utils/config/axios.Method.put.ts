import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.Config";


export const adminBlockStudent = async (userId: string) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/api/v1/admin/blockUser/${userId}`,
    };
    return await apiRequest(config);
  };
  
  export const adminUnblockStudent = async (userId: string) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/api/v1/admin/unBlockUser/${userId}`,
    };
    return await apiRequest(config);
  };
  