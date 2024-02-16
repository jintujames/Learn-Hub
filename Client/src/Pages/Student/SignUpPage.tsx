import React from "react";
import Navbar from "../../Components/User/Header/Navbar";
import Register from "../../Components/User/SignUp/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";

function SignUpPage() {
  return (
    <>
      <Navbar />
      <GoogleOAuthProvider clientId="419735693860-la7jj5seqlvfo1cqd22n4f0j9hptqfm0.apps.googleusercontent.com">
        <Register />
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default SignUpPage;
