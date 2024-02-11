import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSettingNewPassword } from '../../../utils/validations/newPasswordValidation'
import { reSetPassword, studentForgetPassword } from '../../../utils/config/axios.Methode.post';


export type settingNewPasswordType = {
  newPassword: string;
  confirmPassword: string;
};

function NewPassword() {
const navigate = useNavigate();

const {errors,handleSubmit,register} = useSettingNewPassword()


const handleSettingNewPassword=async (data:settingNewPasswordType)=>{
  console.log(data,"datatatatat after validation");
  await reSetPassword(data.newPassword).then((response: any) => {
    console.log(response,"yyyyy");
    
    if (response.status === 200) {
      navigate("/login", {replace:true});
    }
  });
  

}


  return (
    <>
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
                <h1 className="text-xl font-semibold">Create New Password</h1>
                <small className="text-gray-400">
                  Your New Password Must be Different From Previously Used Password
                </small>
                {/* Form */}
                <form onSubmit={handleSubmit(handleSettingNewPassword)} className="mt-4">
                  <div className="mb-3">
                  {errors.newPassword ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.newPassword?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                    New password
                                </label>
                                )}
                    <input
                    {...register('newPassword')}
                      type="password"
                      placeholder="*****"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                    
                  </div>
                  <div className="mb-3">
                  {errors.confirmPassword ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.confirmPassword?.message}</span>
                                ) : (
                                  <label className="mb-2 block text-xs font-semibold">
                                    Confirm password
                                </label>
                                )}
                    <input
                      type="text"
                      {...register("confirmPassword")}
                      placeholder="*****"
                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3 flex flex-wrap content-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="mr-1 checked:bg-purple-700"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                    type='submit'
                      className="mb-1.5 block w-full text-center text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md"
                    >
                      Save
                    </button>
                    
                  </div>
                </form>

                {/* Footer */}
                <div className="text-center">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default NewPassword
