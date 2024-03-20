import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonIcon } from "@ionic/react";
import { CirclePlay } from "lucide-react";
import UserVideoPlayer from "./UserVideoPlayer";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl, UserBaseUrl } from "../../../utils/Api";
import SingleViewPayButton from "../PayButton/SingleViewPayButton";
import { setSingleCourseDetails } from "../../../Features/TutorSlice/courseSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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
  video: string;
}

function CourseDetails() {
  const { courseId } = useParams();

  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem("") || "{}");
  const { courseDetails } = useSelector((state: any) => state.course);
  const [userId, setuserId]: any = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isClick, setisClick] = useState(false);

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
        // toast.error(response.data.message);
      }
    } else {
      toast.error("Please log in to add the course to your cart.");
    }
  };

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/getCourse/${courseId}`)
      .then((response:any) => {
        dispatch(setSingleCourseDetails(response.data));
        checkEnrollmentStatus(response.data._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId, dispatch]);

  const checkEnrollmentStatus = async (courseId: any) => {
    if (userData && courseId) {
      try {
        const response = await axios.get(
          `${UserBaseUrl}/check-enrollment/${userId}/${courseId}`
        );
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    }
  };
  return (
    <>
      {isClick && (
        <>
          <UserVideoPlayer videoUrl={videoUrl} />
        </>
      )}
      <section className=" bg-blueGray-200 -mt-24">
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
                <div className="relative ">
                  <img
                    className="w-full rounded-xl "
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
                    <div className="rounded-full w-6 h-8   md:w-8 md:h-8 bg-gray-200" />
                    <span className="absolute top-0 right-0 inline-block w-3 h-6 bg-primary-red rounded-full" />
                  </div>
                  <p className="ml-6 text-gray-800 line-clamp-3">{courseDetails.instructor}</p>
                </div>
                <div className="my-4">
                  <div className="flex space-x-1 items-center">
                    <h2 className="text-sky-500 font-bold text-lg">
                      &#8377;  {courseDetails.coursefee}
                    </h2>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <span className="mx-2"></span>

                    {isEnrolled ? (
           <Link to="/entrolledCourses">
           <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
             Enrolled
           </button>
         </Link>
          ) : (                   
             <button
                      onClick={handleAddToCart}
                      className="px-6 py-2 rounded-md bg-yellow-300 text-gray-900 text-sm font-medium  hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300"
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

        <>
          {/* component */}
          <div className="flex justify-center items-center min-h-screen p-14">
            <div className="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5 bg-gray-800 text-white">
              <h1 className="py-5 text-lg">Ratings and Comments</h1>
              <div className="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md">
                <IonIcon className="py-4 p-3" name="search-outline" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Search Review"
                  className="p-2 bg-transparent focus:outline-none"
                />
              </div>
              {/* Tags */}
              
              {/* Item Container */}
              <div className="flex flex-col gap-3 mt-14">
                <div className="flex flex-col gap-4 bg-gray-700 p-4">
                  {/* Profile and Rating */}
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 text-center rounded-full bg-red-500">
                        J
                      </div>
                      <span>Jess Hopkins</span>
                    </div>
                    <div className="flex p-1 gap-1 text-orange-300">
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                      <IonIcon name="star-half" />
                    </div>
                  </div>
                  <div>
                    Gorgeous design! Even more responsive than the previous
                    version. A pleasure to use!
                  </div>
                  <div className="flex justify-between">
                    <span>Feb 13, 2021</span>
                    <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60">
                      <IonIcon className="py-4 p-3" name="search-outline" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-gray-700 p-4">
                  {/* Profile and Rating */}
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 text-center rounded-full bg-yellow-500">
                        A
                      </div>
                      <span>Alice Banks</span>
                    </div>
                    <div className="flex p-1 gap-1 text-orange-300">
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                      <IonIcon name="star" />
                    </div>
                  </div>
                  <div>
                    The device has a clean design and the metal housing feels
                    sturdy in my hands. Soft rounded corners make it a pleasure
                    to look at.
                  </div>
                  <div className="flex justify-between">
                    <span>Feb 13, 2021</span>
                    <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60">
                      <IonIcon name="share-outline" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

        <footer className="relative pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center"></div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default CourseDetails;
