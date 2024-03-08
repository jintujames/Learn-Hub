import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/Student/LoginPage";
import SignUpPage from "./Pages/Student/SignUpPage";
import TutorSignUpPage from "./Pages/Tutor/TutorSignUpPage";
import TutorLoginPage from "./Pages/Tutor/TutorLoginPage";
import TutorProfilePage from "./Pages/Tutor/TutorProfilePage";
import HomePage from "./Pages/Student/HomePage";
import React from "react";
import ForgetPasswordPage from "./Pages/Student/ForgetPasswordPage";
import OtpPage from "./Pages/Student/OtpPage";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import AdminDashboardPage from "./Pages/Admin/AdminDashboardPage";
import HomeLoginPage from "./Pages/Student/HomeLoginPage";
import AdminUserPage from "./Pages/Admin/AdminUserPage";
import AdminTutorPage from "./Pages/Admin/AdminTutorPage";
import AdminCategoryPage from "./Pages/Admin/AdminCategoryPage";
import { ToastContainer } from "react-toastify";
import NewPassword from "./Components/User/ForgetPswd/NewPassword";
import { selectUser } from "./Features/UserSlice/userSlice";
import { useSelector } from "react-redux";
import CoursePage from "./Pages/Student/CoursePage";
import "react-toastify/dist/ReactToastify.css";
import TutorPrivateRoute from "./Components/PrivateRouter/TutorPrivateRoute";
import CourseDetailsPage from "./Pages/Student/CourseDetailsPage";

function App() {
  const user = useSelector(selectUser);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomeLoginPage />} />
          <Route path="/forget_password" element={<ForgetPasswordPage />} />
          <Route path="/otp_verify" element={<OtpPage />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courseDetails" element={<CourseDetailsPage />} />
          <Route path="/cart" element={<CourseDetailsPage />} />



            <Route path="/tutorProfile/*" element={<TutorProfilePage />} />
            <Route path="/tutorImage" element={<TutorProfilePage />} />
            <Route path="/addCourse" element={<TutorProfilePage />} />
            <Route path="/myCourse" element={<TutorProfilePage />} />


            



      
          <Route path="/tutorSignup" element={<TutorSignUpPage />} />
          <Route path="/tutorLogin" element={<TutorLoginPage />} />

          <Route path="/adminLogin" element={<AdminLoginPage />} />
          <Route path="/adminDashboard" element={<AdminDashboardPage />} />
          <Route path="/adminStudent" element={<AdminUserPage />} />
          <Route path="/adminTutor" element={<AdminTutorPage />} />
          <Route path="/adminCategory" element={<AdminCategoryPage />} />
          <Route path="/addCategory" element={<AdminCategoryPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
