import express from "express";
// import {uploadMedia} from '../../../s3/s3'  uploadMedia.single('file') 
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
  blockUser,
  unblockUser,
  blockTutor,
  unblockTutor,
} from "../../Controller/adminController/adminController";

adminRouter.post("/adminLogin", loginAdmin);
adminRouter.get("/adminDashboard");
adminRouter.get("/", adminLogout);
adminRouter.get("/adminStudent", getAllStudent);
adminRouter.get("/adminTutor", getAllInstructor);
adminRouter.post("/addCategory", addCategory);
adminRouter.get("/adminCategory", getAllCategory);
adminRouter.post("/editCategory",editCategory);
adminRouter.put("/deleteCategory/:id", deleteCategory);
adminRouter.put('/blockUser/:id',blockUser)
adminRouter.put('/unBlockUser/:id',unblockUser)
adminRouter.put('/blockTutor/:id',blockTutor)
adminRouter.put('/unBlockTutor/:id',unblockTutor)





export { adminRouter };
