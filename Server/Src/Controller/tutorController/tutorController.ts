import { Request, Response } from "express";
import bcrypt from "bcrypt";
import instructorModel from "../../Models/instructorModel";
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config"
import Tutor from "../../Models/instructorModel";


//Instructor Register

const instructorSignup = async (req: Request, res: Response) => {
    try {
        const { instructorFirstName, instructorLastName, instructorEmail, phone, password} = req.body
        const tutorExists = await instructorModel.findOne({ instructorEmail })
        const tutorPhone = await instructorModel.findOne({ phone })

        if (tutorExists || tutorPhone) {
            return res.status(400).json({ message: "User Already Exists"})
        }

        const instructor = await instructorModel.create({
            instructorFirstName,
            instructorLastName,
            instructorEmail,
            phone,
            password,
        });

        if ( instructor ) {
            const token = generateToken(instructor._id);
            res.status(200).json({
                _id: instructor._id,
                instructorFirstName: instructor.instructorFirstName,
                instructorLastName: instructor.instructorLastName,
                instructorEmail: instructor.instructorEmail,
                phone: instructor.phone,
                token,
                
            })
        } else {
            return res.status(400).json({message: "Invalid Instructor data"})
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"})
        
    }
}


const loginInstructor = async (req: Request, res: Response) => {
    const { instructorEmail, password} = req.body

    try{
        const instructor = await instructorModel.findOne({ instructorEmail})

        if(!instructor) {
            return res.status(401).json({ message: "User not logged in"})
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
            }) 
        } else {
            return res.status(401).json({ message: "invalid email or password"})
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"})
    }
}


const firebaseGoogleTutorAuthVerication = async (req: Request, res: Response) => {
    const inComingEmailForVerification = req.query.email;
    console.log(inComingEmailForVerification, "incoming email");
    const userExists = await instructorModel.findOne({
      instructorEmail: inComingEmailForVerification,
    });
    if (userExists) {
      res.send({ userExist: true });
    } else {
      const us = {
        instructorEmail: inComingEmailForVerification,
      };
      const tutor = await Tutor.create(us);
      if (tutor) {
        const token = generateToken(tutor._id);
        console.log("hiiiii");
  
        res.send({ userExist: true, token });
      }
    }
  };
  


export{ 
    instructorSignup, 
    loginInstructor,
    firebaseGoogleTutorAuthVerication
}

