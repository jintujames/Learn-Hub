import { Request, Response } from "express";
import bcrypt from "bcrypt";
import instructorModel from "../../Models/instructorModel";
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import Tutor from "../../Models/instructorModel";
import courseModel from "../../Models/courseModel";
import studentModel from "../../Models/studentModel"
import orderModel from "../../Models/orderModel";

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
    const instructor = await instructorModel.findOne({ instructorEmail })
    .where({isBlocked: false})

    if (!instructor) {
      return res.status(401).json({ message: "User not logged in" });
    }

    if (instructor?.isBlocked === true) {
      return res.status(401).json({ message: "User is blocked" });
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

const addCourses = async (req: Request, res: Response) => {
  console.log("I'm adding course");

  try {
    const {
      courseName,
      courseDescription,
      shortDescription,

      isApproved,
      category,
      coursefee,
      instructor,
      image, 
    } = req.body;

    console.log(req.body, "Body data");

    const course = await courseModel.create({
      courseName,
      courseDescription,
      shortDescription,
      isApproved,
      category,
      coursefee,
      instructor:instructor,
      image, 
    });

    await course.save();

    console.log(course, "Course");

    if (course) {
      res.status(200).json(course);
      console.log("sending req to frnd");
    } else {
      res.status(400).json({ message: "Invalid Data Entry" });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const addLesson = async (req: Request, res: Response) => {
  try {
    const { courseName, Description, title, category, courseLevel, video } =
      req.body;

    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: courseName },
      {
        $push: {
          courseLessons: {
            video,
            title,
            Description,
            category,
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
    res.status(500);
    throw error;
  }
};



const instructorBio = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const instructorBioDetails = await instructorModel.findById(userId).exec();
    console.log(instructorBioDetails);
    
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


const getCourses = async (req:Request,res:Response)=>{
  try{
    const id=req.params.id
    const courseDetails = await courseModel.find({instructor:id})
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

const updateTutorProfile = async (req: Request, res: Response) => {
  try {
    const { photo, id } = req.body;

    if (!photo || typeof photo !== 'string' || !id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const tutor: any = await instructorModel.findByIdAndUpdate(id, { $set: { photo: photo } });

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    return res.status(200).json({ message: 'Profile updated successfully', tutor: tutor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const editInstructorProfile = async (req: Request, res: Response) => {
  try {
   
    const updateData = req.body; 
    console.log(updateData);
    
const {name,id}=req.body

    const instructorBioDetails = await instructorModel.findByIdAndUpdate(name, id, { new: true }).exec();
    console.log(instructorBioDetails);

    if (instructorBioDetails) {
      const updateResult = await instructorBioDetails.save();

      res.status(200).json({
        message: "Profile updated successfully",
        instructorBioDetails: updateResult,
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

const getStudentDetails = async (req:Request,res:Response)=>{
  try {

const {tutorId}= req.body

console.log(req.body);

    const studentData =await orderModel.find({tutorId}).exec()
  
    console.log(studentData,'GGGGGG');
    

    if(studentData){
      console.log(studentData,"get dataaaaaaaa************");
      
const students:any=[]
      for(let i=0 ;i<studentData.length;i++){
        console.log(studentData[i],'------');
        
        const id=studentData[i].studentId
        const studentDetails:any=await studentModel.findById(id)
        
        students.push(studentDetails)
      }

      console.log(students,'DETAILSSSSS');
      
        res.status(200).json({
          studentData,
          students
        })
    }else{
        return res.status(400).json({
            message:"no users Found"
        })

    }
} catch (error) {
    console.log(error)
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
  getCourses,
  updateTutorProfile,
  editInstructorProfile,
  getStudentDetails
};
