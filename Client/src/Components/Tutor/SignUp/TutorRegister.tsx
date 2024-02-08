import React, { useState } from 'react'
import { signUpTutor } from '../../../utils/api/api.Types';
import { tutorSignup } from '../../../utils/config/axios.Methode.post';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTutorAuth } from '../../../utils/validations/tutorSignInValidation';

function TutorRegister() {
console.log("logingngg");

  const navigate = useNavigate();
  const { handleSubmit,errors,register } = useTutorAuth();


  type tutorAuth = {
    instructorFirstName: string;
    instructorLastName: string;
    instructorEmail: string,
    phone: string;
    password: string;
  };
 

  console.log(errors,"errorsssws");
  
  
  const handleSignUPTutor = async (data: tutorAuth) => {
    
    await tutorSignup(data).then((response: any) => {
      console.log(response,"response");
      
      if (response.status === 200) {
        navigate("/tutorProfile");
      }
    });
  };

  

  return (
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
              style={{ width: "24rem", height: "32rem" }}
            >
              <div className="w-72">
                {/* Heading */}
                <h1 className="text-xl text-center font-semibold">Create Your Account</h1>
                <br></br>

                {/* Form */}
                <form onSubmit={handleSubmit(handleSignUPTutor)}>
                  <div className="mb-3">
                  {errors.instructorFirstName ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.instructorFirstName?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                   First Name
                                </label>
                                )}
                    <input
                      type="text"
                      {...register("instructorFirstName")}
                      placeholder="Enter your First Name"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                  {errors.instructorLastName ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.instructorLastName?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                 Last Name
                                </label>
                                )}
              
                    <input
                      type="text"
                     {...register('instructorLastName')}
                      placeholder="Enter your Last Name"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3">
                  {errors.instructorEmail ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.instructorEmail?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                   Email
                                </label>
                                )}
                      <input
                      type="text"
                     {...register('instructorEmail')}
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
                    <input
                      type="submit"
                      className="mb-1.5 block w-full text-center text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default TutorRegister

