import { Request, Response } from "express";
import bcrypt from "bcrypt";
import instructorModel from "../../Models/instructorModel";
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import Tutor from "../../Models/instructorModel";
import courseModel from "../../Models/courseModel";

//Instructor Register

const instructorSignup = async (req: Request, res: Response) => {
  try {
    const {
      instructorFirstName,
      instructorLastName,
      instructorEmail,
      phone,
      password,
    } = req.body;
    const tutorExists = await instructorModel.findOne({ instructorEmail });
    const tutorPhone = await instructorModel.findOne({ phone });

    if (tutorExists || tutorPhone) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const instructor = await instructorModel.create({
      instructorFirstName,
      instructorLastName,
      instructorEmail,
      phone,
      password,
    });

    if (instructor) {
      const token = generateToken(instructor._id);
      res.status(200).json({
        _id: instructor._id,
        instructorFirstName: instructor.instructorFirstName,
        instructorLastName: instructor.instructorLastName,
        instructorEmail: instructor.instructorEmail,
        phone: instructor.phone,
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid Instructor data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginInstructor = async (req: Request, res: Response) => {
  const { instructorEmail, password } = req.body;

  try {
    const instructor = await instructorModel.findOne({ instructorEmail });

    if (!instructor) {
      return res.status(401).json({ message: "User not logged in" });
    }

    if (instructor && (await instructor.matchPassword(password))) {
      const token = generateToken(instructor._id);

      return res.json({
        _id: instructor._id,
        instructorFirstName: instructor.instructorFirstName,
        instructorLastName: instructor.instructorLastName,
        instructorEmail: instructor.instructorEmail,
        phone: instructor.phone,
        token,
      });
    } else {
      return res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const tutorLogout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Tutor Logged Out" });
};

const firebaseGoogleTutorAuthVerication = async (
  req: Request,
  res: Response
) => {
  console.log(req.body, "this body body");
  const { result } = req.body;
  const tutorExists = await instructorModel.findOne({
    instructorEmail: result.user.email,
  });
  if (tutorExists) {
    const token = generateToken(tutorExists._id);
    return res.send({ tutorExist: true, token });
  } else {
    const data = {
      instructorEmail: result.user.email,
      instructorFirstName: result._tokenResponse.firstName,
      instructorLastName: result._tokenResponse.lastName,
      photo: result.user.photoURL,
    };
    const tutor = await Tutor.create(data);
    if (tutor) {
      const token = generateToken(tutor._id);
      console.log("hiiiii");

      return res.send({ tutorExist: true, token });
    }
  }
};

const addLesson = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "hhhhhhhhhhhhhhhhh");
    const { courseName, Description, title, category, courseLevel, video } = req.body;


    console.log(courseName,"nammmmmmmmmmmmmmmmm")
    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: courseName },
      {
        $push: {
          courseLessons: {
            video,
            title,
            Description, // Corrected property name
            category,    // Corrected property name
            courseLevel,
          },
        },
      },
      { new: true }
    );
    if (updatedCourse) {
      res.status(201).json(updatedCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
};


const addCourses = async (req: any, res: Response) => {
  try {

    const {
      courseName,
      courseDescription,
      isApproved,
      category,
      coursefee,
     
      tutorId 
    } = req.body;

    
  

    const {filename} = req.file



    const createdCourse = await courseModel.create({
      instructor : tutorId ,
      courseName:courseName,
      courseDescription:courseDescription,
      isApproved:isApproved,
      category:category,
      coursefee :coursefee,
      image:filename
    });

    console.log(createdCourse,'this is create Course');
    

    if (createdCourse) {
      res.status(200).json({ createdCourse });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    console.log('this  si eroor ',error);
    
    res.status(500); // Internal server error
    throw error;
  }
};

const instructorBio = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const instructorBioDetails = await instructorModel.findById(userId).exec();
    if (instructorBioDetails) {
      res.status(200).json({
        instructorBioDetails,
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

const getCourses = async (req: Request, res: Response) => {
  try{
    const { id } = req.params

    console.log(id,"tutor Id")

    const AllCourses = await courseModel.find({instructor:id}).populate('instructor')
    console.log(AllCourses,"coursessss");


    if(AllCourses){
      res.status(200).json({AllCourses})
    }    

  }catch(err){
    res.status(500)
    console.log(err)

  }
}

export {
  instructorSignup,
  loginInstructor,
  tutorLogout,
  firebaseGoogleTutorAuthVerication,
  addLesson,
  addCourses,
  instructorBio,
  getCourses
};
