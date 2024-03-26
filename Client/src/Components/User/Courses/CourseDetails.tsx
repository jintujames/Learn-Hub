import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonIcon } from "@ionic/react";
import { CirclePlay } from "lucide-react";
import UserVideoPlayer from "./UserVideoPlayer";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl, UserBaseUrl } from "../../../utils/Api";
import SingleViewPayButton from "../PayButton/SingleViewPayButton";
import { Course, setSingleCourseDetails } from "../../../Features/TutorSlice/courseSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function CourseDetails() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("") || "{}");
  const { courseDetails } = useSelector((state: any) => state.course);
  const [userId, setuserId]: any = useState("");
  const [enrolled, setEnrolled] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isClick, setisClick] = useState(false);
  const [entrolledCourses, setEntrolledCourses] = useState<Course[]>([]);
  useEffect(() => {
    const data: any = localStorage.getItem("userId");
    setuserId(data);
  }, []);

  const handlePlay = () => {
    setisClick(true);
    setVideoUrl(courseDetails.courseLessons[0].video);
  };

  const handleAddToCart = async () => {
    if (userId) {
      try {
        const response = await axios.post(`${UserBaseUrl}/addToCart`, {
          courseId: courseDetails?._id,
          userId: userId,
        });
        console.log(response, "added to cart");
        toast.success(response.data.message);
      } catch (error) {
        console.error("Error occur while adding to cart", error);
      }
    } else {
      toast.error("Please log in to add the course to your cart.");
    }
  };

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/getCourse/${courseId}`)
      .then((response: any) => {
        dispatch(setSingleCourseDetails(response.data));
        checkEnrollmentStatus(response.data._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId, dispatch]);

  const checkEnrollmentStatus = async (courseId: any) => {
    if (userData && courseId) {
      console.log(userData, "userdata is here!!!!!!!!!");
      try {
        const response = await axios.get(
          `${UserBaseUrl}/check-enrollment/${userId}/${courseId}`
        );
        setEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`${UserBaseUrl}/entrolledCourses/${userId}`)
        .then((response) => {
          console.log(response.data, "response annuijbhkjbhkjkjhh");
          setEntrolledCourses(response.data);
         
          console.log(response.data, "fffffffffffffff");
        })
        .catch((error) => {
          console.error("Error fetching enrolled courses:", error);
          
        });
    }
  }, [userId]);

  return (
    <>
      {isClick && (
        <>
          <UserVideoPlayer videoUrl={videoUrl} />
        </>
      )}
      <section className="bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-6/12 px-4 text-center"></div>
          </div>
  
          <div className="flex flex-wrap items-center mt-20">
            <div className="w-full md:w-6/12 px-7 mr-auto ml-auto">
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                {courseDetails.courseName}
              </h3>
              <h2 className="text-lg font-semibold leading-normal mt-4 mb-4 text-zinc-500">
                {courseDetails.courseDescription}
              </h2>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-Gray-100">
                {courseDetails.shortDescription}
              </p>
            </div>
  
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                <div className="relative">
                  <img
                    className="w-full rounded-xl"
                    src={courseDetails.image[0]}
                    alt="Colors"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-65"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <CirclePlay size={40} color="white" onClick={handlePlay} />
                  </div>
                </div>
  
                <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                  {courseDetails.courseName}
                </h1>
                <div className="flex space-x-5 my-4 items-center">
                  <div className="relative">
                    <div className="rounded-full w-6 h-8 md:w-8 md:h-8 bg-gray-200" />
                    <span className="absolute top-0 right-0 inline-block w-3 h-6 bg-primary-red rounded-full" />
                  </div>
                  <p className="ml-6 text-gray-800 line-clamp-3">
                    {courseDetails.instructor}
                  </p>
                </div>
                <div className="my-4">
                  <div className="flex space-x-1 items-center">
                    <h2 className="text-sky-500 font-bold text-lg">
                      &#8377; {courseDetails.coursefee}
                    </h2>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <>
                      {console.log(
                        entrolledCourses,
                        'YYYYYYYYYYYYYYYYYYYYYYYYYYYY',
                        courseDetails
                      )}
                    </>
                    {entrolledCourses.some(
                      (course: any) => course.courseId._id == courseDetails._id
                    ) ? (
                      <Link to="/enrolledCourses">
                        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
                          Enrolled
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="px-6 py-2 rounded-md bg-yellow-300 text-gray-900 text-sm font-medium hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <h2 className="text-xl font-semibold mt-14 mb-4">Ratings and Comments</h2>
        <ul>
          <li className="mb-4">
            <div className="border p-4 border-secondary w-400">
              <p className="text-secondary font-semibold">User: studentName</p>
              <p className="text-lg font-semibold">Rating</p>
              <p className="mt-2">Comment: comment</p>
            </div>
          </li>
        </ul>
      </section>
    </>
  )
                    }

export default CourseDetails
