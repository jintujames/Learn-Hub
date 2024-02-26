import express from "express";
const multer = require('multer');
const tutorRouter = express.Router();

import {
  addCourses,
  firebaseGoogleTutorAuthVerication,
  instructorBio,
  instructorSignup,
  loginInstructor,
  tutorLogout,
} from "../../Controller/tutorController/tutorController";
import { upload } from "../../Multer/upload";

// tutorRouter.get("/",(req,res)=>{
//     console.log("api working");
//   res.json({status:true})
// })

tutorRouter.post("/tutorSignup", instructorSignup);
tutorRouter.post("/tutorLogin", loginInstructor);
tutorRouter.post("/tutorLogout", tutorLogout);

tutorRouter.post("/firebseAuthVerify", firebaseGoogleTutorAuthVerication);
tutorRouter.get("/tutorProfile", instructorBio);
tutorRouter.post("/addLesson",);
tutorRouter.post('/addCourse',upload.single('image'), addCourses);


export default tutorRouter;
