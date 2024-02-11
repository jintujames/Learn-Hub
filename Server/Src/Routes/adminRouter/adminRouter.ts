import express from "express";
const adminRouter = express.Router();

import { 
    loginAdmin,
    getAllStudent,
    getAllCategory,
    getAllInstructor,
    addCategory,
    adminLogout,
    
 } from "../../Controller/adminController/adminController";



adminRouter.post("/adminLogin", loginAdmin );
adminRouter.get("/adminDashboard" );
adminRouter.get("/", adminLogout );
adminRouter.get("/adminStudent", getAllStudent);
adminRouter.get("/adminTutor", getAllInstructor);
adminRouter.post("/addCategory", addCategory)
adminRouter.get("/adminCategory", getAllCategory);





export{
    adminRouter
} 