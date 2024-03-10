import { AxiosRequestConfig } from "axios";
import { signUpUser, signInUser, signInAdmin, addAdminCategory, courseBio, LessonData } from "../api/api.Types";
import { signUpTutor, signInTutor } from "../api/api.Types";
import { apiRequest } from "./axios.Config";

export const studentSignUp = async (signUpPayload: signUpUser) => {
  console.log(signUpPayload,"PAYLOAD");
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/student/signup`,
    data: signUpPayload,
  };
  return await apiRequest(config);
};

export const studentLogin = async (signInPayload: signInUser) => {
  console.log("signInPayload", signInPayload);

  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "api/v1/student/login",
      data: signInPayload,
    };

    return await apiRequest(config);
  } catch (error) {
    throw error;
  }
};

export const studentLogout = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "api/v1/student/logout",
      // You may include additional headers or data if required
    };

    return await apiRequest(config); // You may handle the response as needed
  } catch (error) {
    throw error; // Handle any errors occurred during the API call
  }
};

export const tutorSignup = async (SignUpPayload: signUpTutor) => {
  console.log(SignUpPayload);

  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/tutor/tutorSignup`,
    data: SignUpPayload,
  };
  return await apiRequest(config);
};

export const tutorLogin = async (SignInPayload: signInTutor) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/tutor/tutorLogin`,
    data: SignInPayload,
  };
  return await apiRequest(config);
};

export const tutorLogout = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "api/v1/tutor/tutorLogout",
      // You may include additional headers or data if required
    };

    return await apiRequest(config); // You may handle the response as needed
  } catch (error) {
    throw error; // Handle any errors occurred during the API call
  }
};

export const studentForgetPassword = async (forgetPasswordPayload: String) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/student/forget_password`,
    data: forgetPasswordPayload,
  };
  return await apiRequest(config);
};

export const reSetPassword = async (newPassword: String) => {
  console.log(newPassword, "new passwor");

  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/student/newpassword`,
    data: { newPassword },
  };
  return await apiRequest(config);
};

export const adminLogin = async (LoginPayload: signInAdmin) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `/api/v1/admin/adminLogin`,
    data: LoginPayload,
  };
  return await apiRequest(config);
};

export const adminLogout = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "api/v1/admin/adminLogout",
      // You may include additional headers or data if required
    };

    return await apiRequest(config); // You may handle the response as needed
  } catch (error) {
    throw error; // Handle any errors occurred during the API call
  }
};



export const verifyOTP = async (otp: string) => {
  console.log("calling");

  console.log(otp, "otp methode caling");

  const config: AxiosRequestConfig = {
    method: "POST",
    url: `/api/v1/student/otp_verify`,
    data: { otp },
  };

  return await apiRequest(config);
};


export const addCategory = async (categoryPayload: addAdminCategory) => {
  console.log("categoryPayload", categoryPayload);

  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "api/v1/admin/addCategory",
      data: categoryPayload,
    };

    return await apiRequest(config);
  } catch (error) {
    throw error;
  }
};

export const editAdminCategory = async (categoryPayload: addAdminCategory,id:any) => {
  console.log("categoryPayload", categoryPayload);

  try {
    const data={
      id:id,
      name:categoryPayload
    }
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "api/v1/admin/editCategory",
      data: data,
    };

    return await apiRequest(config);
  } catch (error) {
    throw error;
  }
};

export const addCourseBio = async (coursePayload: courseBio) => {
  console.log(coursePayload,"coursePayload");
  
  const formData = new FormData();
  formData.append('image', coursePayload.image);
  formData.append('courseName', coursePayload.courseName);
  formData.append('courseDescription', coursePayload.courseDescription);
  formData.append('courseLevel', coursePayload.courseLevel);
  formData.append('isApproved', coursePayload.isApproved);
  formData.append('category', coursePayload.category);
  formData.append('coursefee', coursePayload.coursefee);
  formData.append('tutorId' , coursePayload.tutorId)
  
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/tutor/addCourse`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }; 

  try {
    const response = await apiRequest(config);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('Error in API request:', error);
    throw error; 
  }
};

export const addCourseLesson = async (coursePayload: LessonData) => {
  console.log(coursePayload,"coursePayload");
  
  const formData = new FormData();
  formData.append('courseName', coursePayload?.courseName);
  formData.append('title', coursePayload?.title);
  formData.append('Description', coursePayload?.Description);
  formData.append('isApproved', coursePayload?.isApproved);
  formData.append('category', coursePayload?.category);
  formData.append('courseLevel', coursePayload?.courseLevel);
  formData.append('tutorId' , coursePayload?.tutorId)
  formData.append('video', coursePayload?.video);


console.log(formData , 'hahhaahhahahaha');
  
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `api/v1/tutor/addLesson`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }; 

  try {

    console.log(formData)
    const response = await apiRequest(config);
    console.log('Lesson API Response:', response);
    return response;
  } catch (error) {
    console.error('Error in API request:', error);
    throw error; 
  }
};



