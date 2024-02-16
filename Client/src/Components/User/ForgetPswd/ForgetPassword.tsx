import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { studentForgetPassword } from "../../../utils/config/axios.Methode.post"; // Adjust the path accordingly
import React from "react";
import axios from "axios";

function ForgetPassword() {
  const [studentEmail, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const trimmedEmail = studentEmail.trim();

    if (trimmedEmail === "") {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await studentForgetPassword({
        studentEmail: trimmedEmail,
        password: "",
      });

      navigate("/otp_verify", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        console.error(error.code);

        if (error.response) {
          console.log(error.response.data); // Log more details for debugging
        } else if (error.request) {
          console.log("Network error:", error.request);
        }
      } else {
        console.error(error);
      }

      toast.error("An error occurred. Please check the console for details.");
    }
  };

  // JSX content
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
            style={{ width: "24rem", height: "22rem" }}
          >
            <div className="w-72">
              {/* Heading */}
              <h1 className="text-xl text-center font-semibold">
                Forgot Password
              </h1>
              <small className="text-gray-500">
                Please Enter Your Email Address To Receive a Verification Code
              </small>
              {/* Form */}
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-md border border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% focus:border-gradient-to-r focus:from-indigo-700 focus:via-sky-700 focus:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-gradient-200 py-1 px-1.5 text-gray-500"
                  />
                </div>

                <div className="mb-3 flex flex-wrap content-center">
                  {/* Consider adding content here if needed */}
                </div>

                <div className="mb-3">
                  <button className="mb-1.5 block w-full text-center text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-700 hover:via-sky-700 hover:to-emerald-700 px-2 py-1.5 rounded-md">
                    Send
                  </button>
                </div>
              </form>

              {/* Footer */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
