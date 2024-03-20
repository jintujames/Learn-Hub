import React from 'react'
import Footer from '../../Components/User/Footer/Footer'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'
import EnrolledCourse from '../../Components/User/EnrolledCourses/EnrolledCourse'

function EnrolledPage() {
  return (
    <div>
        <HomeNavLogin />
      <NavbarLogin />
      <EnrolledCourse />
      <Footer />
      
    </div>
  )
}

export default EnrolledPage
