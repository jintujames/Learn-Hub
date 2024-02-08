import React from "react"
import TutorRegister from "../../Components/Tutor/SignUp/TutorRegister"
import Navbar from "../../Components/User/Header/Navbar"
import { GoogleOAuthProvider } from "@react-oauth/google"

function TutorSignUpPage() {
  return (
    <>
    <Navbar />
   
    <GoogleOAuthProvider clientId="419735693860-la7jj5seqlvfo1cqd22n4f0j9hptqfm0.apps.googleusercontent.com">
      <TutorRegister />

    </GoogleOAuthProvider>;
    </>
  )
}

export default TutorSignUpPage
