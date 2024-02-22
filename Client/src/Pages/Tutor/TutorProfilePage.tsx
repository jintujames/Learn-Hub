import React, { useState } from "react";

import Footer from "../../Components/User/Footer/Footer";
import TutorSidebar from "../../Components/Tutor/TutorNav/TutorSidebar";
import Navbar from "../../Components/User/Header/Navbar";
import { Routes, Route } from "react-router-dom";
import AddCourse from "../../Components/Tutor/TutorProfile/AddCourse";
import AddImage from "../../Components/Tutor/TutorProfile/AddImage";
import TutorBio from "../../Components/Tutor/TutorProfile/TutorBio";
import AddCourseBio from "../../Components/Tutor/TutorProfile/AddCourseBio";

function TutorProfilePage() {
  const [state, setState] = useState(0);
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
          element={<TutorSidebar children={<AddCourse />} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default TutorProfilePage;
