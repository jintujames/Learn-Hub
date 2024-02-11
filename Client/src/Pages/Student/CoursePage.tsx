import React from 'react'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'
import CourseCards from '../../Components/User/Courses/courseCards'
import Footer from '../../Components/User/Footer/Footer'


function CoursePage() {
  return (
    <>
      <HomeNavLogin />
      <NavbarLogin />
      <CourseCards /> 
      <Footer /> 

     
    </>
  )
}

export default CoursePage
