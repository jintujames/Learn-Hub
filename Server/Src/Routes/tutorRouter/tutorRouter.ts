import express from "express";
const tutorRouter = express.Router();

import {
    firebaseGoogleTutorAuthVerication,
    instructorSignup, loginInstructor
} from "../../Controller/tutorController/tutorController";

// tutorRouter.get("/",(req,res)=>{
//     console.log("api working");
//   res.json({status:true})    
// })

tutorRouter.post("/tutorSignup", instructorSignup)

tutorRouter.post("/tutorLogin", loginInstructor)
tutorRouter.post("/firebseAuthVerify", firebaseGoogleTutorAuthVerication )

tutorRouter.post("/tutorProfile")



export default tutorRouter