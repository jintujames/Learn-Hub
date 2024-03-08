import { Request, Response } from "express";
import bcrypt from "bcrypt";
import studentModel from "../../Models/studentModel";
import categoryModel from "../../Models/categoryModel"
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import User from "../../Models/studentModel";
import { sendMail } from "../../Middleware/mailSender";
import courseModel from "../../Models/courseModel";

// Student Register

const globalData = {
  otp: null as null | number,
  user: null as null | {
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    phone: string;
    password: string;
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

const forgetPassword = async (req: Request, res: Response) => {
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


const userGetCourses = async (req:Request,res:Response)=>{
  try{
    const courseDetails = await courseModel.find().exec();
  console.log("Fetched Course Details:", courseDetails);
    if(courseDetails){
      res.status(200).json({
        courseDetails,message:"courseDetails"
      })
    }else{
      return res.status(400).json({
        error:"no course available "
      })
    }
  }
  catch(error){
    console.log(error);
  }
}

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
  studentProfile
};
