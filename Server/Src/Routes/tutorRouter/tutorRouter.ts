import express from "express";
const multer = require('multer');
const tutorRouter = express.Router();

import {
  addCourses,
  firebaseGoogleTutorAuthVerication,
  getCourses,
  instructorBio,
  instructorSignup,
  loginInstructor,
  tutorLogout,
  addLesson,
  updateTutorProfile,
  editInstructorProfile,
  getStudentDetails
} from "../../Controller/tutorController/tutorController";
import { upload } from "../../Multer/upload";
import { isLogin } from "../../Middleware/authMiddleware";

// tutorRouter.get("/",(req,res)=>{
//     console.log("api working");
//   res.json({status:true})
// })

tutorRouter.post("/tutorSignup", instructorSignup);
tutorRouter.post("/tutorLogin", loginInstructor);
tutorRouter.post("/tutorLogout", tutorLogout);

tutorRouter.post("/firebseAuthVerify", firebaseGoogleTutorAuthVerication);
tutorRouter.get("/tutorProfile/:id", instructorBio);
tutorRouter.post("/updateProfile", updateTutorProfile);
tutorRouter.post("/editProfile", editInstructorProfile);



tutorRouter.post("/addLesson",addLesson);
tutorRouter.post('/addCourse', addCourses);
tutorRouter.get('/courses/:id',getCourses);
tutorRouter.post('/getAllStudents',getStudentDetails)



export default tutorRouter;
