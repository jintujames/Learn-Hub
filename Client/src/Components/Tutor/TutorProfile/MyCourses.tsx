import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../../utils/config/axios.Config";
import { login } from "../../../Features/TutorSlice/tutorSlice";

function MyCourses() {
  const [courses, setCourse] = useState([]);
  const tutorId = localStorage.getItem("tutorId");
  console.log(tutorId, "user");

  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/v1/tutor/courses/${tutorId}`)
      .then((res) => {
        console.log(res.data?.AllCourses?.image, "ffffffffff");
        setCourse(res.data.AllCourses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(login,"logiiiiiiiin");

  return (
    <div>
  <div className="p-6">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {courses.length === 0 ? (
        <div className="overflow-hidden rounded-2xl bg-gray-500">
          <h1>No courses available</h1>
        </div>
      ) : (
        courses.map((course) => (
          <div className="card" key={course?._id}>
            <div className="flex items-center h-[180px] overflow-hidden">
              <img
                src={""} 
                alt="Hamburger"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <div>
                  <h2 className="mt-2 text-lg font-semibold text-gray-800">
                    {course?.courseName}
                  </h2>
                  <p className="text-gray-400">Learn React</p>
                </div>
              </div>
              <hr className="mt-4 mb-4" />
              <div className="flex flex-wrap justify-between">
                <p className="inline-flex items-center">
                <Link to="/tutorProfile/myCourse/myCourseView" className="mt-2 inline-block rounded-full bg-orange-400 p-3 text-sm font-medium text-white">
  Read More
</Link>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>

  );
}

export default MyCourses;
