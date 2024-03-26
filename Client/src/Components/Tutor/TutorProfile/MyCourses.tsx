import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../utils/config/axios.Config";
import { login } from "../../../Features/TutorSlice/tutorSlice";
import { toast } from "react-toastify";
import { getTutorCourses } from "../../../utils/config/axios.Method.Get";
import { useDispatch } from "react-redux";
import {
  clearCourseDetails,
  setSingleCourseDetails,
} from "../../../Features/TutorSlice/courseSlice";
interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  category: string;
  coursefee: number;
  image: string[];
  createdAt: Date;
  updatedAt: Date;
}

function MyCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;
  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const page = Math.ceil(data.length / dataPerPage);
  const paginateddata = data.slice(firstIndex, lastIndex);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page != currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };


  const tutorId = localStorage.getItem("tutorId");
  console.log(tutorId, "user");


  useEffect(() => {
    getTutorCourses(tutorId)
      .then((response: any) => {
        if (response.data.courseDetails) {
          console.log("Course details:", response.data.courseDetails);
          setCourseDetails(response.data.courseDetails);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  const hanldeReadmore = (item: any) => {
    dispatch(clearCourseDetails());
    dispatch(setSingleCourseDetails(item));
    navigate("/tutorProfile/myCourseView");
  };

  return (
    <div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
         
          {courseDetails.map((course) => (
            <div className="card" key={course._id}>
              <div className="flex items-center h-[180px]  bg-gray-300">
                <img src={course?.image[0]} alt="course Thumbnail" />
              </div>
              <div className="p-6 ">
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center  h-32 overflow-y-auto ">
                  <div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-800">
                      {course?.courseName}
                    </h2>
                    <p className="text-gray-400">{course.courseDescription}</p>
                    <p className="text-gray-400">{course.courseDuration}</p>
                  </div>
                </div>

                <hr className="mt-4 mb-4" />
                <div className="flex flex-wrap justify-between">
                  <p className="inline-flex items-center">
                    <button
                      className="mt-2 inline-block rounded-full bg-orange-400 p-3 text-sm font-medium text-white"
                      onClick={() => {
                        hanldeReadmore(course);
                      }}
                    >
                      Read More
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <nav className="flex justify-center items-center rounded-lg space-x-2">
      <span
        className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
        onClick={handlePrev}
      >
        <span aria-hidden="true">«</span>
        <span className="sr-only">Previous</span>
      </span>
      {Array.from({ length: page }, (_, index) => (
        <span
          key={index }
          className={`w-10 h-10 ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "text-gray-500 hover:text-teal-600"
          } p-4 inline-flex items-center text-sm font-medium rounded-full`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      <span
        className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
        onClick={handleNext}
      >
        <span className="sr-only">Next</span>
        <span aria-hidden="true">»</span>
      </span>
    </nav>
      </div>
    </div>
  );
}

export default MyCourses;
