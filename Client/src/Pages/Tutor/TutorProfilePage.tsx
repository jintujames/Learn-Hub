import React from "react"

import Footer from "../../Components/User/Footer/Footer"
import TutorSidebar from "../../Components/Tutor/TutorNav/TutorSidebar"
import AddCouseBio from "../../Components/Tutor/TutorProfile/AddCouseBio"
import Navbar from "../../Components/User/Header/Navbar"
import TutorBio from "../../Components/Tutor/TutorProfile/TutorBio"
import AddImage from "../../Components/Tutor/TutorProfile/AddImage"

function TutorProfilePage() {
  return (
    <div>
      <Navbar />
      <TutorSidebar />
      <TutorBio />
      <Footer /> 

      
    </div>
  )
}

export default TutorProfilePage
