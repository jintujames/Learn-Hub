import React from 'react'
import Footer from '../../Components/User/Footer/Footer'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'
import EnrolledCourse from '../../Components/User/EnrolledCourses/EnrolledCourse'
import Chat from '../../Components/User/Chat/Chat'

function EnrolledPage() {
  return (
    <div>
        <HomeNavLogin />
      <NavbarLogin />

      <EnrolledCourse />
      <div className="mt-5 px-2 lg:px-0">
      <div className="overflow-x-auto">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-5/6 mx-auto mt-28">
      <Footer />
      </div>
      </div>
      </div>
      </div>
      
    </div>
  )
}

export default EnrolledPage
