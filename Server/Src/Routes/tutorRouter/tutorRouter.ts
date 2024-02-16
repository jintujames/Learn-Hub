import express from "express";
const tutorRouter = express.Router();

import {
  firebaseGoogleTutorAuthVerication,
  instructorSignup,
  loginInstructor,
  tutorLogout,
} from "../../Controller/tutorController/tutorController";

// tutorRouter.get("/",(req,res)=>{
//     console.log("api working");
//   res.json({status:true})
// })

tutorRouter.post("/tutorSignup", instructorSignup);
tutorRouter.post("/tutorLogin", loginInstructor);
tutorRouter.post("/tutorLogout", tutorLogout);

tutorRouter.post("/firebseAuthVerify", firebaseGoogleTutorAuthVerication);
tutorRouter.get("/tutorProfile");

export default tutorRouter;
