import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.Config";


export const deleteAdminCategory = async (id: any) => {
  console.log("idddddddd",id)
    const config: AxiosRequestConfig = {
      method: "PUT",
      url:`/api/v1/admin/deleteCategory/${id}`,
      
    
    };
    return await apiRequest(config);
  };