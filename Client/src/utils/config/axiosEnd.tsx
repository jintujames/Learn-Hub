import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Create an Axios instance with a base URL


  export const axiosInstance = axios.create({
    baseURL:'http://localhost:4001/'
})
  
// axiosInstance.interceptors.request.use((config) => {
//   const studentToken = useSelector((state:any)=>state.user.user._id)
//   toast.success(studentToken+"OMIMIMIMIMIMIMI")
//   console.log(studentToken, "tokennnnnnnnnn");
//   config.headers = config.headers || {};

//   if (studentToken !== null) {
//     config.headers.Authorization = `Bearer ${studentToken}`;
// }
// return config;
//   })

//   axiosInstance.interceptors.response.use(     
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.data) {
//             console.log(error.response, "error")
//             const errorMessage = error.response.data.error || 'An error occurred';
//             // Show error toast with errorMessage
//             toast.error(errorMessage, { autoClose: 2000, style: { color: '#fff', background: 'black' } });
//         } else {
//             console.error('Axios error:', error);
//         }
//         return Promise.reject(error);
//     }
// )


export const axiosInstanceTutor = axios.create({
  baseURL:'http://localhost:4001/api/v1/tutor'
})

//axiosInterceptor for Tutor
axiosInstanceTutor.interceptors.request.use((config) => {
  const tutorToken = localStorage.getItem('Token');
  config.headers = config.headers || {};


  if (tutorToken !== null) {
      config.headers.authorization = `Bearer ${tutorToken}`;
  }
  return config;
})
axiosInstanceTutor.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.data) {          
          const errorMessage = error.response.data.error || 'An error occurred';
          // Show error toast with errorMessage
          toast.error(errorMessage, { autoClose: 2000, style: { color: '#fff', background: 'black' } });
      } else {
          console.error('Axios error:', error);
      }
      return Promise.reject(error);
  }
)

export const axiosInstanceAdmin = axios.create({
  baseURL:'http://localhost:4001/api/v1/admin'
})

//axiosInterceptor for Admin
axiosInstanceAdmin.interceptors.request.use((config)=>{
  const adminToken = localStorage.getItem('Token');
  config.headers = config.headers || {};

  if(adminToken !== null){
      config.headers.Authorization = `Bearer ${adminToken}`
  }
  return config;
})
axiosInstanceAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.data) {          
          const errorMessage = error.response.data.error || 'An error occurred';
          // Show error toast with errorMessage
          toast.error(errorMessage, { autoClose: 2000, style: { color: '#fff', background: 'black' } });
      } else {
          console.error('Axios error:', error);
      }
      return Promise.reject(error);
  }
)
