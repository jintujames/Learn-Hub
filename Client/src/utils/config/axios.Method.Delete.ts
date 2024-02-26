import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.Config";


export const deleteAdminCategory = async (id: any) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/api/v1/admin/deleteCategory`,
      data : id
    };
    return await apiRequest(config);
  };