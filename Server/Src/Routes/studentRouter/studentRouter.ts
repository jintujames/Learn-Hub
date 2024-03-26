import express from "express";
const studentRouter = express.Router();

import {
  studentSignUp,
  studentLogin,
  forgetPassword,
  verifyForgetPassword,
  newPassword,
  firebaseGoogleAuthVerication,
  studentLogout,
  userGetAllCategory,
  userGetCourses,
  studentProfile,
  addToCart,
  getCart,
  RemoveCourseFromCart,
  updateUserProfile,
  editProfile,
  RemoveAllCoursesFromCart,
  enrolledCourses,
  clearCart,
  checkEnrollmentStatus,
  ratings,
  getRatings
} from "../../Controller/studentController/studentController";

import { isLogin } from "../../Middleware/authMiddleware";

studentRouter.get("/", (req, res) => {
  console.log("api working");
  res.json({ status: true });
});

studentRouter.get("/", userGetAllCategory);
studentRouter.post("/signup", studentSignUp);
studentRouter.post("/login", studentLogin);
studentRouter.post("/logout", studentLogout);
studentRouter.get("/userProfile/:id", studentProfile);
studentRouter.post("/updateUserProfile", updateUserProfile);
studentRouter.post("/EditUserProfile", editProfile);




studentRouter.post("/forget_password", forgetPassword);
studentRouter.post("/otp_verify", verifyForgetPassword);
studentRouter.post("/newpassword", newPassword);
studentRouter.get("/firebseAuthVerify", firebaseGoogleAuthVerication);
studentRouter.get("/courses", isLogin, userGetCourses);
studentRouter.post("/addToCart", addToCart);
studentRouter.get("/cart/:userId",isLogin ,getCart);
studentRouter.delete('/removeCourse/:cartItemId',RemoveCourseFromCart)
studentRouter.delete('/clearCart/:userId', RemoveAllCoursesFromCart)
studentRouter.get('/entrolledCourses/:userId',enrolledCourses)
studentRouter.post("/clearCart",clearCart)
studentRouter.get('/check-enrollment/:userId/:courseId', checkEnrollmentStatus);
studentRouter.post('/ratings',ratings)
studentRouter.get('/ratings/:courseId',getRatings)




export { studentRouter };
