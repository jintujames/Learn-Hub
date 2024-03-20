import React from 'react'
import TutorList from '../../Components/User/Tutor/TutorList'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import Footer from '../../Components/User/Footer/Footer'

function TutorPage() {
  return (
    <>
      <HomeNavLogin />
      <NavbarLogin />
      <TutorList /> 
      <Footer /> 

     
    </>
  )
}

export default TutorPage
