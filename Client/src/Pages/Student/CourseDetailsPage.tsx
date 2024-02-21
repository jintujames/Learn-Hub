import React from 'react'
import CourseDetails from '../../Components/User/Courses/CourseDetails'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import Footer from '../../Components/User/Footer/Footer'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'

function CourseDetailsPage() {
  return (
    <div>
      <HomeNavLogin />
      <NavbarLogin />
      <CourseDetails />
      <Footer /> 
    </div>
  )
}

export default CourseDetailsPage
