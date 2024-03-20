import React from 'react'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'
import EnrolledSingleCourse from '../../Components/User/EnrolledCourses/EnrolledSingleCourse'
import Footer from '../../Components/User/Footer/Footer'

function SingleEnrollPage() {
  return (
    <>
    <HomeNavLogin />
  
    <NavbarLogin />
   
    <EnrolledSingleCourse />
    
    <Footer /> 
    </>
  )
}

export default SingleEnrollPage
