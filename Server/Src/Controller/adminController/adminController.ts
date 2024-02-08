import { NextFunction, Request, Response } from "express";
import studentModel from "../../Models/studentModel";
import InstructorModel from "../../Models/instructorModel";
import generateToken from "../../Utlitis/generateToken";
import categoryModel from "../../Models/categoryModel";
import instructorModel from "../../Models/instructorModel";


const loginAdmin = async (req: Request, res: Response) => {
    try {

        const adminEmail = "admin@gmail.com"
        const adminPassword = 123456
        const id = "ObjectId(65bb5e5f359e1fc0bbdd7e0f)"
        const { email, password } = req.body;
        if ( adminEmail == email && adminPassword == password) {
            const token = generateToken(id)
            return res.status(200).json({
                id,
                adminEmail,
                token,
            })
        } else {
            return res.status(400).json({
                message: "please correct code"
            })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
}

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
      const categoryDetails = await categoryModel.find().exec();
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
      const { categoryName, description } = req.body;
  
      const categoryExists = await categoryModel.findOne({
        title: { $regex: new RegExp(categoryName, "i") },
      });
  
      if (categoryExists) {
        console.log("kk");
  
        return res.status(400).json({ message: "Category already exists" });
      }
  
      const category = await categoryModel.create({
        categoryName,
        description,
      });
  
      if (category) {
        console.log(categoryName, "created");
        res.status(201).json({
          categoryName,
          description,
        });
      } else {
        res.status(400).json({ message: "Invalid category data" });
      }
    } catch (error) {
      next(error); // Pass the error to the Express error handling middleware
    }
  };


export {
    loginAdmin,
    getAllStudent,
    getAllInstructor,
    getAllCategory,
    addCategory
}



