import React, { useEffect, useState } from "react";
import { signInTutor } from "../../../utils/api/api.Types";
import { tutorLogin } from "../../../utils/config/axios.Methode.post";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleSignIn } from "../../../utils/customeHooks/customeHooks";
import { googleTutorAuthVerification } from "../../../utils/config/axios.Method.Get";
import { Auth } from "firebase/auth";
import { authentication } from "../../../utils/config/firebase.config";
import { useTutorValidate } from "../../../utils/validations/tutorLoginValidation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Features/TutorSlice/tutorSlice";
import { toast } from "react-toastify";

function TutorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useTutorValidate();

  const { tutor } = useSelector((state: any) => state.tutor);

  useEffect(() => {
    if (tutor) {
      console.log("tutor is here");
      navigate("/tutorProfile",{ replace: true });
    }
  }, []);

  const handleLogin = async (data: signInTutor) => {
    try {
      const response: any = await tutorLogin(data);

      console.log(response, "response");
      if (response.status === 200) {
        console.log(response.data.token, "res");
        dispatch(login(response.data.token));
        localStorage.setItem("Token", `${response.data.token}`);
        // navigate("/", { replace: true });
        navigate("/tutorProfile",{ replace: true });
      } else {
        if (response.response.status === 404) {
          toast.error(response.response.data.message);
        } else if (response.response.status === 401) {
          toast.error(response.response.data.message);
        }
      }
    } catch (error) {}
  };

  const googleSignInTutor = async (auth: Auth) => {
    try {
      // useGooglesignIn is custom hook that handles all firebase related config
      const response = await useGoogleSignIn(auth);
      console.log(response, "response");
      if (response.status && response.userEmail !== null) {
        try {
          const res: any = await googleTutorAuthVerification(response);
          console.log(res, "this is ressspoce from bakend ");
          if (res.status === 200) {
            console.log(res, "ressssssss");
            if (res.data.tutorExist) {
              localStorage.setItem("Token", `${res.data.token}`);
              dispatch(login(res.data.token));
              navigate("/tutorProfile",{ replace: true });
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

  return (
    <div>
      <>
        {/* Container */}
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-white">
          {/* Login component */}
          <div className="flex shadow-md">
            {/* Login banner */}
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
            {/* Login form */}
            <div
              className="flex flex-wrap content-center justify-center rounded-r-md bg-white"
              style={{ width: "24rem", height: "22rem" }}
            >
              <div className="w-72">
                {/* Heading */}
                <h1 className="text-xl font-semibold">Welcome back</h1>
                <small className="text-gray-400">
                  Welcome back! Please enter your details
                </small>
                {/* Form */}
                <form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
                  <div className="mb-3">
                    {errors.instructorEmail ? (
                      <span className="text-sm font-normal text-red-600 ">
                        {errors.instructorEmail?.message}
                      </span>
                    ) : (
                      <label className="mb-2 block text-xs font-semibold">
                        Email
                      </label>
                    )}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("instructorEmail")}
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 block text-xs font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="*****"
                      {...register("password")}
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3 flex flex-wrap content-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="mr-1 checked:bg-purple-700"
                    />
                    <label
                      htmlFor="remember"
                      className="mr-auto text-xs font-semibold"
                    >
                      Remember for 30 days
                    </label>
                    <span className="text-xs font-semibold text-purple-700">
                      <Link to="/forget_password">Forgot password?</Link>
                    </span>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="mb-1.5 block w-full text-center text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md"
                    >
                      Sign in
                    </button>
                    {/* <button className="flex flex-wrap justify-center w-full border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:border-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md">
                      <img
                        className="w-5 mr-2"
                        src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                      />
                      Sign in with Google
                    </button> */}
                  </div>
                </form>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => googleSignInTutor(authentication)}
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
                {/* Footer */}
                <div className="text-center">
                  <span className="text-xs text-gray-400 font-semibold">
                    Don't have an account?
                  </span>
                  <Link
                    to={`/tutorSignup`}
                    className="text-xs font-semibold text-purple-700"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default TutorLogin;
