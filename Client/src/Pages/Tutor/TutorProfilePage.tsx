import React, { useState } from "react";

import Footer from "../../Components/User/Footer/Footer";
import TutorSidebar from "../../Components/Tutor/TutorNav/TutorSidebar";
import Navbar from "../../Components/User/Header/Navbar";
import { Routes, Route } from "react-router-dom";
import AddCourse from "../../Components/Tutor/TutorProfile/AddCourse";
import AddImage from "../../Components/Tutor/TutorProfile/AddImage";
import TutorBio from "../../Components/Tutor/TutorProfile/TutorBio";
import AddCourseBio from "../../Components/Tutor/TutorProfile/AddCourseBio";
import AddLesson from "../../Components/Tutor/TutorProfile/AddLesson";
import MyCourses from "../../Components/Tutor/TutorProfile/MyCourses";
import ViewCourse from "../../Components/Tutor/TutorProfile/ViewCourse";
import MyCourseViewPage from "./MyCourseViewPage";
import VideoPlayer from "../../Components/Tutor/TutorProfile/VideoPlayer";

function TutorProfilePage() {
  const [state, setState]:any = useState(0);
  return (
    <div>
      
      <Navbar />


      <Routes>
        <Route path="/" element={<TutorSidebar children={<TutorBio />} />} />

        <Route
          path="/image"
          element={<TutorSidebar children={<AddImage />} />}
        />        

        <Route
          path="/addCourse"
          element={<TutorSidebar children={<AddCourseBio />} />}
        />
        <Route
          path="/addLesson"
          element={<TutorSidebar children={< AddLesson/>} />}
        />
        <Route
          path="/myCourse"
          element={<TutorSidebar children={< MyCourses/>} />}
        />
        <Route
          path="/myCourseView"
          element={<TutorSidebar children={< MyCourseViewPage />} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default TutorProfilePage;
