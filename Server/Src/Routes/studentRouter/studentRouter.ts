import express from "express";
const studentRouter = express.Router();

import { 
    studentSignUp,
    studentLogin,
    forgetPassword,
    verifyForgetPassword,
    newPassword,
    firebaseGoogleAuthVerication,
    studentLogout

} from "../../Controller/studentController/studentController";

import { protect } from "../../Middleware/authMiddleware";


studentRouter.get("/",(req,res)=>{
  console.log("api working");
  res.json({status:true})    
})

studentRouter.post("/signup", studentSignUp)
studentRouter.post("/login", studentLogin)
studentRouter.post("/logout", studentLogout)

studentRouter.post("/forget_password", forgetPassword);
studentRouter.post("/otp_verify", verifyForgetPassword);
studentRouter.post("/newpassword", newPassword);
studentRouter.get("/firebseAuthVerify",firebaseGoogleAuthVerication)

studentRouter.get("/courses");





export { studentRouter }