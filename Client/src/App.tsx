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
import CourseDetailsPage from "./Pages/Student/CourseDetailsPage";
import ProfilePage from "./Pages/Student/ProfilePage";
import CartPage from "./Pages/Student/CartPage";
import CheckOutPage from "./Pages/Student/CheckOutPage";
import PaymentSuccess from "./Components/User/Payment/PaymentSuccess";
import EnrolledPage from "./Pages/Student/EnrolledPage";
import SingleEnrollPage from "./Pages/Student/SingleEnrollPage";
import TutorPage from "./Pages/Student/TutorPage";
import ChatPage from "./Pages/Student/ChatPage";
import PrivatePage from "./Components/PrivateRouter/PrivatePage";
import AdminPrivateRoute from "./Components/PrivateRouter/AdminPrivateRoute";

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
          <Route path="/forget_password" element={<ForgetPasswordPage />} />
          <Route path="/otp_verify" element={<OtpPage />} />
          <Route path="/newPassword" element={<NewPassword />} />

          <Route element={<PrivatePage isStudent={true} />}>
          <Route path="/Home" element={<HomeLoginPage />} />       
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/tutors" element={<TutorPage />} />
            <Route path="/courseDetails" element={<CourseDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/userProfile" element={<ProfilePage />} />
            <Route path="/userProfile" element={<ProfilePage />} />
            <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="/enrolledCourses" element={<EnrolledPage />} />
            <Route path="/singleEnrolledCourses" element={<SingleEnrollPage />} />
            <Route path="/chatBox" element={<ChatPage />} />
          </Route>




          <Route path="/tutorSignup" element={<TutorSignUpPage />} />
          <Route path="/tutorLogin" element={<TutorLoginPage />} />
        <Route element={<PrivatePage isStudent={false} />}>
          <Route path="/tutorProfile/*" element={<TutorProfilePage />} />
          <Route path="/tutorImage" element={<TutorProfilePage />} />
          <Route path="/addCourse" element={<TutorProfilePage />} />
          <Route path="/myCourse" element={<TutorProfilePage />} />
          <Route path="/tutorEnrollHistory" element={<TutorProfilePage />} />

        </Route>

          <Route path="/adminLogin" element={<AdminLoginPage />} />
          <Route element={<AdminPrivateRoute isStudent={true} />}>
          <Route path="/adminDashboard" element={<AdminDashboardPage />} />
          <Route path="/adminStudent" element={<AdminUserPage />} />
          <Route path="/adminTutor" element={<AdminTutorPage />} />
          <Route path="/adminCategory" element={<AdminCategoryPage />} />
          <Route path="/addCategory" element={<AdminCategoryPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
