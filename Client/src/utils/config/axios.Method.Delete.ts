import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.Config";


export const deleteAdminCategory = async () => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/api/v1/admin/deleteCategory`,
    };
    return await apiRequest(config);
  };