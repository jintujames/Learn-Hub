
import React from 'react'
import Navbar from '../../Components/User/Header/Navbar'
import Login from '../../Components/User/Login/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'

function LoginPage() {
  return (
    <>
      <div>
      <Navbar />
      <GoogleOAuthProvider clientId="419735693860-la7jj5seqlvfo1cqd22n4f0j9hptqfm0.apps.googleusercontent.com">
        <Login />                
      </GoogleOAuthProvider>;
    </div>
    </>
  
  )
}

export default LoginPage
