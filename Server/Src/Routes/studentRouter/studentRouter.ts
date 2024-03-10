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
} from "../../Controller/studentController/studentController";

import { protect } from "../../Middleware/authMiddleware";

studentRouter.get("/", (req, res) => {
  console.log("api working");
  res.json({ status: true });
});

studentRouter.get("/", userGetAllCategory);
studentRouter.post("/signup", studentSignUp);
studentRouter.post("/login", studentLogin);
studentRouter.post("/logout", studentLogout);
studentRouter.get("/userProfile/:id", studentProfile);


studentRouter.post("/forget_password", forgetPassword);
studentRouter.post("/otp_verify", verifyForgetPassword);
studentRouter.post("/newpassword", newPassword);
studentRouter.get("/firebseAuthVerify", firebaseGoogleAuthVerication);
studentRouter.get("/courses", userGetCourses);
studentRouter.post("/addToCart", addToCart);
studentRouter.get("/cart/:userId", getCart);
studentRouter.delete('/removeCourse/:cartItemId',RemoveCourseFromCart)



export { studentRouter };
