import express from "express";
const adminRouter = express.Router();

import {
  loginAdmin,
  getAllStudent,
  getAllCategory,
  getAllInstructor,
  addCategory,
  adminLogout,
  editCategory,
  deleteCategory,
} from "../../Controller/adminController/adminController";

adminRouter.post("/adminLogin", loginAdmin);
adminRouter.get("/adminDashboard");
adminRouter.get("/", adminLogout);
adminRouter.get("/adminStudent", getAllStudent);
adminRouter.get("/adminTutor", getAllInstructor);
adminRouter.post("/addCategory", addCategory);
adminRouter.get("/adminCategory", getAllCategory);
adminRouter.post("/editCategory", editCategory);
adminRouter.delete("/deleteCategory", deleteCategory);



export { adminRouter };
