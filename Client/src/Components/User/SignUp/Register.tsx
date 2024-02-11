import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Auth } from "firebase/auth";

import { signUpUser } from "../../../utils/api/api.Types";
import { studentSignUp } from "../../../utils/config/axios.Methode.post";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleSignIn } from "../../../utils/customeHooks/customeHooks";
import { authentication } from "../../../utils/config/firebase.config";
import { useStudentAuth } from "../../../utils/validations/signInValidation";
import { googleAuthVerification } from "../../../utils/config/axios.Method.Get";
import { useDispatch } from "react-redux";
import { signup } from "../../../Features/UserSlice/userSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { errors, handleSubmit, register, reset } = useStudentAuth();

  type studentAuth = {
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    phone: string;
    password: string;
  };

  const googleSignInStudent = async (auth: Auth) => {
    try {
      const response = await useGoogleSignIn(auth);
      console.log(response, "response");
      if (response.status && response.userEmail !== null) {
        try {
          const res: any = await googleAuthVerification(response.userEmail);
          if (res.status === 200) {
            console.log(res, "ressssssss");
            if (res.data.userExist) {
              console.log(res.data.token, "res");
              localStorage.setItem("Token",`${res.data.token}`);
              dispatch(signup (res.data.token))
              navigate("/Home",{replace:true});
            } else {
              console.log("user not exist");
            }
          } else if (res.response.status === 404) {
            console.log(res.response.data.errors[0].message, "error message");
          }
        } catch (error) {
          console.log("something went wrong ook");
        }
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
  const handleSignUP = async (data: studentAuth) => {
    await studentSignUp(data).then((response: any) => {
      if (response.status === 200) {
        console.log(response.data,"jiiiii");
        navigate("/login",{replace:true});
        toast.success(response.data);
      } 
    });
  };
  return (
    <div>
      <ToastContainer />
      <>
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-white">
          <div className="flex shadow-md">
            <div
              className="flex flex-wrap content-center justify-center rounded-l-md"
              style={{ width: "32rem", height: "25rem" }}
            >
              <img
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-md"
                src="public/3D_Girl_with_tablet_and_working_process_on_desktop__1_-removebg-preview.png"
                alt="Login Banner"
              />
            </div>
            <div
              className="flex flex-wrap content-center justify-center rounded-r-md bg-white"
              style={{ width: "24rem", height: "32rem" }}
            >
              <div className="w-72">
                <h1 className="text-xl text-center font-semibold">
                  Create Your Account
                </h1>
                <br></br>

                <form onSubmit={handleSubmit(handleSignUP)}>
                  <div className="mb-3">
                  {errors.studentFirstName ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.studentFirstName?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                   First Name
                                </label>
                                )}
                    <input
                      type="text"
                      {...register("studentFirstName")}
                      placeholder="Enter your First Name"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                  {errors.studentLastName ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.studentLastName?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                 Last Name
                                </label>
                                )}
              
                    <input
                      type="text"
                     {...register('studentLastName')}
                      placeholder="Enter your Last Name"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                  {errors.studentEmail ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.studentEmail?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                   Email
                                </label>
                                )}
                      <input
                      type="email"
                     {...register('studentEmail')}
                      placeholder="Enter your email"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                  {errors.phone ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.phone?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                 Phone
                                </label>
                                )}
                    <input
                      type="text"
                      {...register('phone')}
                      placeholder="Enter your phone number"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                  {errors.password ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.password?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                Password
                                </label>
                                )}
                    <input
                      type="password"
                      placeholder="*****"
                      {...register('password')}         
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3 flex flex-wrap content-center"></div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="mb-1.5 block w-full text-center text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md"
                      >
                        SIGN UP
                      </button>
                  </div>
                </form>

              
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => googleSignInStudent(authentication)}
                    className="flex items-center justify-center w-full max-w-xs py-3 font-bold text-gray-500 transition-all duration-300 ease-in-out bg-neutral-200 rounded-lg shadow-sm focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className="p-2 bg-white rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign in with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Register;
