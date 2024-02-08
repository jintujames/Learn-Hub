import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.Config";

export const adminGetAllStudent = async () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/api/v1/admin/adminStudent`,
    };
    return await apiRequest(config);
  };


export const adminGetAllInstructor = async () => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/v1/admin/adminTutor`,
    }
    return await apiRequest(config);

}


export const  googleAuthVerification = async (emailPayload:string) => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `api/v1/student/firebseAuthVerify?email=${emailPayload}`
  };
  return await apiRequest(config);
};

export const  googleTutorAuthVerification = async (emailPayload:string) => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `api/v1/tutor/firebseAuthVerify?email=${emailPayload}`
  };
  return await apiRequest(config);
};
