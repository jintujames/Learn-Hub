import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../../../utils/config/axios.Methode.post';
import { signInAdmin } from '../../../utils/api/api.Types';
import { adminValidate } from '../../../utils/validations/adminValidation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Features/AdminSlice/adminSlice';
import { toast } from 'react-toastify';
  
function AdminLogin() {
  const [adminEmail, setEmail] = useState("");
  const [adminPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { errors, handleSubmit, register } = adminValidate();

  const { admin } = useSelector( (state:any) => state.admin)

  useEffect ( () =>{
    if(admin){
      console.log("user is here");
      
      navigate('/adminDashboard')
    }
  },[])

  const handleLogin = async (data: signInAdmin) => {
   
    try {
      const response: any = await adminLogin(data);

      if (response.status === 200) {
        console.log(response.data.token, "res");
        dispatch(login (response.data.token))
        localStorage.setItem("Token", `${response.data.token}`);
        navigate("/adminDashboard");
      } else {
        if (response.response.status === 401) {
          toast.error(response.response.data.message)
        }
        else if (response.response.status === 500) {
          toast.error(response.response.data.message)
        
        }
      }
      
    } catch (error) {}
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
                src="public/3D woman talking with chatbot PNG, SVG (1).jpeg"
          
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
                <h1 className="text-xl text-center font-semibold">Admin Login</h1>
                <small className="text-gray-400">
                </small>
                {/* Form */}
                <form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
                  <div className="mb-3">
                  {errors.adminEmail ? (
                      <span className="text-sm font-normal text-red-600 ">
                        {errors.adminEmail?.message}
                      </span>
                    ) : (
                      <label className="mb-2 block text-xs font-semibold">
                        Email
                      </label>
                    )}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("adminEmail")}

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
                      {...register("adminPassword")}

                      className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                    />
                  </div>
                  <div className="mb-3 flex flex-wrap content-center">                 

                  </div>
                  <div className="mb-3">
                    <button 
                      type="submit"


                      className="mb-1.5 block w-full text-center text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md"
                    >
                      Sign in
                    </button>
                    
                  </div>
                </form>

                {/* Footer */}
               
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default AdminLogin
