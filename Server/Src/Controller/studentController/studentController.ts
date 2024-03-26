import { Request, Response } from "express";
import { Session } from 'express-session';

import bcrypt from "bcrypt";
import studentModel from "../../Models/studentModel";
import categoryModel from "../../Models/categoryModel";
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import User from "../../Models/studentModel";
import { sendMail } from "../../Middleware/mailSender";
import courseModel from "../../Models/courseModel";
import CartItemModel from "../../Models/cartModel";
import cartModel from "../../Models/cartModel";
import orderModel from "../../Models/orderModel";
import RatingModel from "../../Models/RatingModel";

// Student Register

const globalData = {
  otp: null as null | number,
  user: null as null | {
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    phone: string;
    password: string;
    snotp?: string; 
  },
};

const studentSignUp = async (req: Request, res: Response) => {
  try {
    console.log("registering");
    const { studentFirstName, studentLastName, studentEmail, phone, password } =
      req.body;
    console.log(req.body, "body");

    if (
      !studentFirstName ||
      !studentLastName ||
      !studentEmail ||
      !phone ||
      !password
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const userExists = await studentModel.findOne({ studentEmail });
    const userPhone = await studentModel.findOne({ phone });

    if (userExists || userPhone) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const student = {
      studentFirstName,
      studentLastName,
      studentEmail,
      phone,
      password,
    };

    globalData.user = student;
    const rlst = await User.create(student);
    if (rlst) {
      console.log("created");
      return res.status(200).json({ message: "Registered Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured" });
  }
};

const studentLogin = async (req: Request, res: Response) => {
  const { studentEmail, password } = req.body;
  console.log(req.body, "loging");

  try {
    const user = await studentModel
      .findOne({ studentEmail })
      .where({ isBlocked: false });
    console.log(user, "user******");

    if (!user) {
      console.log("USER NOT DEFINED RETURNING ERROR");

      return res
        .status(404)
        .json({ message: "User not found or wrong credentials" });
    }

    if (user?.isBlocked === true) {
      return res.status(401).json({ message: "User is blocked" });
    }
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.status(200).json({
        _id: user._id,
        studentFirstName: user.studentFirstName,
        studentLastName: user.studentLastName,
        email: user.studentEmail,
        phone: user.phone,
        isBlocked: user.isBlocked,
        logStatus: true,
        token,
      });
    } else {
      console.log("errrrrrrr");

      return res.status(401).json({ message: "Invalid Email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const studentLogout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "User Logged Out" });
};

const forgetData = {
  otp: null as null | number,
};

const forgetPassword = async (req: Request & { session: Session }, res: Response) => {
  try {
    const { studentEmail } = req.body;
    req.session.userEmail = studentEmail;
    const userExists = await studentModel.findOne({ studentEmail });

    if (userExists) {
      const otpResultObject: any = await sendMail(studentEmail); // Use 'await' here
      console.log(otpResultObject, "res otp");

      if (otpResultObject.status) {
        console.log(otpResultObject.otp, "otp");

        req.session.snotp = otpResultObject.otp;
        console.log(req.session.snotp, "print session");

        res.status(200).json({
          message: "Email sent successfully",
          otp: otpResultObject.otp,
        });
      } else {
        res.status(500).json({ message: "Email sending failed" });
      }
    } else {
      return res.status(400).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyForgetPassword = async (req: Request, res: Response) => {
  console.log(req.session, "session");
  try {
    const { otp } = req.body;
    console.log(otp, "this is otp");
    console.log(req.session.snotp, "LLLLLLLL");
    if (otp == req.session.snotp) {
      return res.status(200).json({ message: "success", status: true });
    } else {
      return res.status(400).json({ message: "please correct passowrd" });
    }
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    console.log(req.body, "req.body");

    const email = req.session.userEmail;
    studentModel.findOne({ studentEmail: email }).then((user) => {
      const saltRounds = 10;
      bcrypt.hash(newPassword, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while hashing the password",
          });
        } else {
          studentModel
            .findOneAndUpdate({ studentEmail: email }, { password: hash })
            .then((data) => {
              console.log(data, "datatatat");
              console.log(data, "datatatat");
              if (!data) {
                res.status(404).send({
                  message: `Cannot update user with ID: ${email}. User not found.`,
                });
              } else {
                if (req.session && req.session.userEmail) {
                  req.session.userEmail = undefined;
                }
                res.status(200).send({
                  message: "Successfully updated password",
                });
              }
            })
            .catch((err) => {
              res
                .status(500)
                .send({ message: "Error updating user information" });
            });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "An error occurred" });
  }
};

const firebaseGoogleAuthVerication = async (req: Request, res: Response) => {
  const inComingEmailForVerification = req.query.email;
  console.log(inComingEmailForVerification, "incoming email");
  const userExists = await studentModel.findOne({
    studentEmail: inComingEmailForVerification,
  });
  if (userExists) {
    res.send({ userExist: true });
  } else {
    const us = {
      studentEmail: inComingEmailForVerification,
    };
    const user = await User.create(us);
    if (user) {
      const token = generateToken(user._id);
      console.log("hiiiii");

      res.send({ userExist: true, token });
    }
  }
};

const userGetAllCategory = async (req: Request, res: Response) => {
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

const userGetCourses = async (req: Request, res: Response) => {
  try {
    const courseDetails = await courseModel.find().exec();
    console.log("Fetched Course Details:", courseDetails);
    if (courseDetails) {
      res.status(200).json({
        courseDetails,
        message: "courseDetails",
      });
    } else {
      return res.status(400).json({
        error: "no course available ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const studentProfile = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    console.log("Request received for studentId:", studentId);

    const studentProfileDetails = await studentModel.findById(studentId).exec();
    if (studentProfileDetails) {
      res.status(200).json({
        studentProfileDetails,
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

const addToCart = async (req: Request, res: Response) => {
  console.log("cart entry");

  try {
    const { courseId, userId } = req.body;

    const existingCartItem = await cartModel.findOne({
      user: userId,
      course: courseId,
    });

    if (existingCartItem) {
      res.status(400).json({ message: "Course already in the cart" });
    } else {
      const newCartItem = new cartModel({
        user: userId,
        course: courseId,
      });
      await newCartItem.save();
      res.status(200).json({ message: "Course Added Successfully" });
    }
  } catch (error) {
    console.error("Error Occur while Adding to cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCart = async (req: Request, res: Response) => {
  console.log("oiiiii");

  const userId = req.params.userId;

  console.log("userid vannu", userId);

  try {
    const cartItems = await cartModel.find({ user: userId }).populate("course");
    console.log(cartItems, "items");

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart Items", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

const RemoveCourseFromCart = async (req: Request, res: Response) => {
  const cartItemId = req.params.cartItemId;

  try {
    const removedItem = await cartModel.findByIdAndDelete(cartItemId);
    if (!removedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json({ message: "Course removed from the cart" });
  } catch (error) {
    console.error("Error removing course from cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveAllCoursesFromCart = async (req: Request, res: Response) => {
  try {
    const result = await cartModel.deleteMany({});
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No cart items found" });
    }
    
    console.log("All courses removed from cart");
    res.status(200).json({ message: "All courses removed from cart" });
  } catch (error) {
    console.error("Error removing all courses from cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { photo, id } = req.body;

    if (!photo || typeof photo !== "string" || !id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const user: any = await studentModel.findByIdAndUpdate(id, {
      $set: { photo: photo },
    });

    if (!user) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const { id, name } = updateData; 
    const studentProfileDetails = await studentModel.findByIdAndUpdate(id, name, { new: true }).exec();

    if (studentProfileDetails) {
      res.status(200).json({
        message: "Profile updated successfully",
        studentProfileDetails: studentProfileDetails,
      });
    } else {
      return res.status(400).json({
        message: "No user found with the provided ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


const enrolledCourses = async (req: Request, res: Response) => {
  console.log("enrolled courses");

  const userId = req.params.userId;
  console.log(userId, "id ondonnu okkku");

  try {
      const enrolledCourses = await orderModel
          .find({studentId: userId })
          .populate("studentId")
          .populate("courseId")
          .populate("tutorId")
   
          

      console.log(enrolledCourses, "enrolled courses");

      res.status(200).json(enrolledCourses );
  } catch (error) {
      console.log("error While Fetching EnrolledCourses", error);
      res.status(500).json({ error: "internal Server Error" });
  }
}


const clearCart = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body); 
    const cartId = req.body.id;
    
    const deleteCart = await CartItemModel.findByIdAndDelete(cartId);
    if (deleteCart) {
      console.log("Cart deleted successfully");
      res.json({ status: true });
    } else {
      console.log("Cart not found");
      res.json({ status: false });
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const checkEnrollmentStatus =async(req:Request,res:Response)=>{
  const { userId, courseId } = req.params;
try {
  const isEnrolled = await orderModel.exists({
      studentId: userId,
      courseId: courseId,
    });
    console.log(isEnrolled,'II');
    
    res.status(200).json({ isEnrolled });
    
  
}catch (error) {
  console.error("Error checking enrollment status:", error);
  res.status(500).json({ error: "Internal Server Error" });
}

}

const ratings =async(req:Request,res:Response)=>{
  console.log("Hello rating anney")

  try {

      const {rating,comment,user,course} =req.body


      const existRating = await RatingModel.findOne({user,course})

      if(existRating){
          return res.status(400).json("You can only Leave one comment for this course")
      }

      console.log(req.body,"body ondey")

      const newRating = new RatingModel({
          rating,
          comment,
          user,
          course
      })

      await newRating.save()
      res.status(201).json(newRating) 
      
  } catch (error) {
      console.error("Error submitting rating:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }

}

const getRatings =async(req:Request,res:Response)=>{

  try {
      const courseId = req.params.courseId

      const ratings = await RatingModel.find({course:courseId}).populate("user")

      res.status(200).json(ratings)
      
  }  catch (error) {
      console.error("Error fetching ratings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  


}



export {
  studentSignUp,
  studentLogin,
  studentLogout,
  forgetPassword,
  verifyForgetPassword,
  newPassword,
  firebaseGoogleAuthVerication,
  userGetAllCategory,
  userGetCourses,
  studentProfile,
  addToCart,
  getCart,
  RemoveCourseFromCart,
  updateUserProfile,
  editProfile,
  RemoveAllCoursesFromCart,
  enrolledCourses,
  clearCart,
  checkEnrollmentStatus,
  ratings,
  getRatings
};
