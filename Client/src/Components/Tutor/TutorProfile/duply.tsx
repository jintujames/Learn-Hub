import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses, getTutorCourses } from "../../../utils/config/axios.Method.Get";
import { toast } from "react-toastify";


interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  category:string,
  coursefee: number;
  image: string[];
  createdAt: Date;
  updatedAt: Date;
  }
  
  
function CourseCards() {


  const [courseDetails, setCourseDetails] =  useState<Course[]>([])
   
  // const tutorId = localStorage.getItem("tutorId");
  // console.log(tutorId, "user");

  useEffect(() => {

    (async () => {
      const response: any = await getAllCourses();
      console.log("this is catogary", response?.data);

      if (response) {
        setCourseDetails(response?.data?.courseDetails || []);
      }
    })();
  }, []);


  return (
    <>
    <div className="my-8"></div>
    <div className="container mx-auto px-4 md:px-8 lg:px-20 flex flex-wrap space-x-4">
      {courseDetails.map((course) => (
        <div key={course._id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mb-4">
          <img
            className="h-56 w-full object-cover mt-2"
            src={course?.image[0]}
            alt='fegrthgthb'
          />
          <div className="px-4 py-2">
            <Link to={`/courseDetails/${course._id}`}>
              <h2 className="text-gray-900 font-bold text-xl">
                {course?.courseName}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm mt-1">
             
            </p>
          </div>
  
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-sky-500 font-bold text-lg">Rs. {course?.coursefee}</h2>
            <Link to="/courseDetails">
              <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
                View Course
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>

    <div className="w-[75rem] mt-14 ml-3 rounded-lg  mr-16 h-20">
                  <nav className="flex justify-center  bg-white items-center rounded-lg  space-x-2">
                    <span
                      className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
                       >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </span>
                 <span
                 className={`w-10 h-10 
                   "bg-teal-600 text-white"
                  "text-gray-500 hover:text-teal-600"
                 } p-4 inline-flex items-center text-sm font-medium rounded-full`}
                  >
                 </span>
                    <span
                      className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </span>
                  </nav>
                </div>


  </>
  
  );
}

export default CourseCards;
