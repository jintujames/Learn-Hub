import mongoose, { Schema, Document, model, Model } from "mongoose";

enum CourseLevel {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

interface ICourse extends Document {
  courseName: string;
  courseDuration: Date;
  courseDescription: string;
  isApproved: boolean;
  category:string,
  coursefee: number;
  rating: {
    start: number;
    postedby: mongoose.Schema.Types.ObjectId;
  }[];
  totalRating: string | number;
  courseLevel: CourseLevel;
  image: string[];
  instructor: mongoose.Schema.Types.ObjectId;
  courseLessons:string[];
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: Date,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coursefee: {
      type: Number,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    courseLevel: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorcollection", // Replace with your actual instructor collection name
    },
    rating: [
      {
        start: Number,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "studentCollection", // Replace with your actual student collection name
        },
      },
    ],
    courseLessons: [
        {
          title: {
            type: String,
           
          },
          
          video: {
            type: String,
           
          },
          
          isActive: {
            type: Boolean,
           
            default: true,
          },
        },
      ],
    totalRating: {
      type: Number, 
      default: 0,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const courseModel: Model<ICourse> = model<ICourse>("Course", courseSchema);
export default courseModel;
