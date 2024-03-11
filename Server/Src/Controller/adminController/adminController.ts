import { NextFunction, Request, Response } from "express";
import studentModel from "../../Models/studentModel";
import InstructorModel from "../../Models/instructorModel";
import generateToken from "../../Utlitis/generateToken";
import categoryModel from "../../Models/categoryModel";
import instructorModel from "../../Models/instructorModel";

const loginAdmin = async (req: Request, res: Response) => {
  try {
    const adminsEmail = "admin@gmail.com";
    const adminsPassword = 123456;
    const id = "ObjectId(65bb5e5f359e1fc0bbdd7e0f)";
    const { adminEmail, adminPassword } = req.body;

    if (adminEmail == adminsEmail && adminPassword == adminsPassword) {
      const token = generateToken(id);
      return res.status(200).json({
        id,
        adminEmail,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminLogout = async (req: Request, res: Response) => {
  res.cookie("jwtAdmin", "", {
    httpOnly: true,
    expires: new Date(),
  });
  res.status(200).json({ message: "Admin Logged Out" });
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const studentDetails = await studentModel.find().exec();
    if (studentDetails) {
      res.status(200).json({
        studentDetails,
      });
    } else {
      return res.status(400).json({
        message: "no users in this table",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllInstructor = async (req: Request, res: Response) => {
  try {
    const instructorDetails = await instructorModel.find().exec();
    if (instructorDetails) {
      res.status(200).json({
        instructorDetails,
      });
    } else {
      return res.status(400).json({
        message: "no users in this table",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categoryDetails = await categoryModel
      .find({ isDeleted: false })
      .exec();
    if (categoryDetails) {
      res.status(200).json({
        categoryDetails,
      });
    } else {
      return res.status(400).json({
        message: "no users in this table",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, categoryName } = req.body;
    console.log(req.body, "rrrrrr");

    const categoryExists = await categoryModel.findOne({
      categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
      _id: { $ne: id },
    });

    if (categoryExists) {
      console.log(categoryExists, "yyyyyyy");

      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await categoryModel.create({
      categoryName,
    });

    if (category) {
      console.log(categoryName, "created");
      return res.status(200).json({ message: "Category created" });
    } else {
      res.status(400).json({ message: "Invalid category data" });
    }
  } catch (error) {
    next(error); // Pass the error to the Express error handling middleware
  }
};

const editCategory = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  console.log("this is new name", id, name);

  try {
    const categoryNameDetails = await categoryModel.findById(id);
    const existingCategory = await categoryModel.findOne({
      categoryName: { $regex: new RegExp(`^${name.categoryName}$`, "i") },
      _id: { $ne: id },
    });

    if (existingCategory) {
      console.log("here");

      return res.status(400).json({ error: "Category already exist" });
    }
    if (categoryNameDetails) {
      categoryNameDetails.categoryName = name.categoryName;

      const editedCategory = await categoryNameDetails.save();

      return res.status(200).json({ message: "Category updated" });
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  console.log("deletye Category");
  try {
    console.log("body", req.params);
    const { id } = req.params;
    console.log(id, "idddddddddddddd");
    const item: any = await categoryModel.findOne({ _id: id });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    console.log(item, "iiiiiiiiiiiiii");

    if (item && "isDeleted" in item) {
      item.isDeleted = true;
      const updatedItem = await item.save();

      if (updatedItem) {
        res
          .status(200)
          .json({ success: true, message: "Category Deleted Successfully" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Category deletion failed" });
      }
    } else {
      res
        .status(500)
        .json({
          success: false,
          message: "Category deletion failed - Property not found",
        });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log(id, "id");
    const user = await studentModel.findById(id);
    console.log(user, "user");

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    user.isBlocked = true;

    await user.save();

    return res.status(200).json({ message: "User Blocked Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const unblockUser =async(req:Request,res:Response)=>{
  try {
      const {id} =req.params;

      const user =await studentModel.findById(id)

      if(!user){
          return res.status(400).json({message:"User not Found"})
      }

      user.isBlocked =false;

      await user.save();

      return res.status(200).json({message:"User UnBlocked SuccessFully"})

  } catch (error) {
      console.log(error)
      return res.status(400).json({message:"Server Error"})
      
  }
}

const blockTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutor = await instructorModel.findById(id);

    if (!tutor) {
      return res.status(400).json({ message: "Tutor Not Found" });
    }

    tutor.isBlocked = true;
    await tutor.save();

    console.log(`Tutor ${id} Blocked Successfully`);

    return res.status(200).json({ message: "Tutor Blocked Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const unblockTutor =async(req:Request,res:Response)=>{
  try {
      const {id} =req.params;
      console.log(id, "id");

      const tutor =await instructorModel.findById(id)
console.log(tutor, "tutor");

      if(!tutor){
          return res.status(400).json({message:"Tutor not Found"})
      }

      tutor.isBlocked =false;

      await tutor.save();

      return res.status(200).json({message:"Tutor UnBlocked SuccessFully"})

  } catch (error) {
      console.log(error)
      return res.status(400).json({message:"Server Error"})
      
  }
}


export {
  loginAdmin,
  adminLogout,
  getAllStudent,
  getAllInstructor,
  getAllCategory,
  addCategory,
  editCategory,
  deleteCategory,
  blockUser,
  unblockUser,
  blockTutor,
  unblockTutor

};
