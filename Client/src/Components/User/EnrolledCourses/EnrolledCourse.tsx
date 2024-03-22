import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../../Features/UserSlice/userSlice";
import {
  Course,
  clearCourseDetails,
  setSingleCourseDetails,
} from "../../../Features/TutorSlice/courseSlice";
import axios from "axios";
import { BaseUrl, UserBaseUrl } from "../../../utils/Api";
import { toast } from "react-toastify";

function EnrolledCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId]: any = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const { courseDetails } = useSelector((state: any) => state.course);
  const user = useSelector(selectUser);

  console.log(userId, "yyyyyyyyyyyyyyyyyyyy");

  const [entrolledCourses, setEntrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${UserBaseUrl}/entrolledCourses/${userId}`)
        .then((response) => {
          console.log(response.data, "response annu");
          setEntrolledCourses(response.data);
          setLoading(false);
          console.log(response.data, "fffffffffffffff");
        })
        .catch((error) => {
          console.error("Error fetching enrolled courses:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleSingleEnrollCourse = (course: any) => {
    console.log(course, "HIHI");
    dispatch(clearCourseDetails());
    dispatch(setSingleCourseDetails(course));
    if (courseDetails) {
      navigate("/singleEnrolledCourses");
    } else {
      console.log("ERROOOORR");

      toast.error("EROR");
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 md:px-8 lg:px-20 flex flex-wrap space-x-4">
        {entrolledCourses && entrolledCourses.length > 0 ? (
          entrolledCourses.map((course) => (
            <div
              key={course._id}
              className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mb-4"
            >
              <img
                className="h-56 w-full object-cover mt-2"
                src={course.courseId.image[0]}
                alt="Course Thumbnail"
              />
              <div className="px-4 py-2">
                <h2 className="text-gray-900 font-bold text-xl">
                  {course.courseId.courseName}
                </h2>
              </div>
              <div className="flex items-center justify-between px-4 py-2">
                <h2 className="text-sky-500 font-bold text-lg">
                  Rs. {course.courseId.coursefee}
                </h2>
                <div>
                  <button
                    onClick={() => handleSingleEnrollCourse(course)}
                    className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded"
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
 
  <div className="h-screen w-screen bg-gray-50 flex items-center">
    <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
      <div className="w-full lg:w-1/2 mx-8">
        <div className="text-7xl text-purple-400 font-dark font-extrabold mb-8">
          {" "}
          No Enrolled Course Found
        </div>
        
        <Link
  to="/courses"
  className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-rose-600 active:bg-red-600 hover:bg-red-700"
>
  Browse Courses
</Link>

      </div>
      <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
        <img
          src="public/Free PSD _ 3d illustration of female graphic designer character working on tablet.png"
          className=""
          alt="Page not found"
        />
      </div>
    </div>
  </div>
</>

        )}
      </div>
    </div>
  );
}

export default EnrolledCourse;
