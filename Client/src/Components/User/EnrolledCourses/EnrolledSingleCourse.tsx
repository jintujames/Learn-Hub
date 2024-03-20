import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonIcon } from "@ionic/react";
import { CirclePlay } from "lucide-react";
import UserVideoPlayer from "../Courses/UserVideoPlayer";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl, UserBaseUrl } from "../../../utils/Api";
import SingleViewPayButton from "../PayButton/SingleViewPayButton";
import { useNavigate } from "react-router";
import { Course } from "../../../Features/TutorSlice/courseSlice";
import VideoPlayer from "../../Tutor/TutorProfile/VideoPlayer";

export interface Lesson {
  _id: string;
  title: string;
  Description: string;
  courseName: String;
  video: String;
}

function EnrolledSingleCourse() {
  const [userId, setuserId]: any = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isClick, setisClick] = useState(false);
  const [entrolledCourses, setEntrolledCourses] = useState<Course[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("") || "{}");
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const { courseDetails } = useSelector((state: any) => state.course);
  {
    console.log("HIHrIHI", courseDetails);
  }

  {
    console.log("HIHrIHI");
  }
  console.log(localStorage.getItem("userId"), "USER ID FROM LOCAL STORAGE");

  useEffect(() => {
    console.log("hihihi", courseDetails);
    toast.success("HI");
  }, []);

  useEffect(() => {
    const data: any = localStorage.getItem("userId");

    setuserId(data);
    console.log(userId);
  }, [userId]);

  const handlePlay = () => {
    setisClick(true);
    setVideoUrl(courseDetails.courseId.courseLessons[0].video);
  };

  const handleUrl = (url: any) => {
    setCurrentVideoUrl(url);
    setShowVideoModal(true);
  };

  return (
    <>
      {isClick && (
        <>
          <UserVideoPlayer videoUrl={videoUrl} />
        </>
      )}

{showVideoModal && (
        <VideoPlayer
          videoUrl={currentVideoUrl}
          setShowVideoModal={setShowVideoModal}
          setCurrentVideoUrl={setCurrentVideoUrl}
        />
      )}
      <>{console.log("JJJIIIII", courseDetails)}</>
      <section className=" bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-6/12 px-4 text-center"></div>
          </div>

          <div className="flex flex-wrap items-center mt-20">
            <div className="w-full md:w-6/12 px-7 mr-auto ml-auto">
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                {courseDetails.courseId.courseName}
              </h3>
              <h2 className="text-lg font-semibold leading-normal mt-4 mb-4 text-zinc-500">
                {courseDetails.courseId.courseDescription}
              </h2>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-Gray-100">
                {courseDetails.courseId.shortDescription}
              </p>
              <h2 className="text-lg font-semibold leading-normal mt-4 mb-4 text-zinc-500">
                &#8226; Duration: {courseDetails.courseId.courseDuration}
              </h2>

              <h2 className="text-lg font-semibold leading-normal mt-4 mb-4 text-zinc-500">
                &#8226; Category: {courseDetails.courseId.category}
              </h2>
              

              <h5 className="text-black font-bold mb-5">Course Contents :</h5>
              {courseDetails.courseId.courseLessons.map((lesson: any, index: number) => (

              <div key={index} className="w-[800] flex rounded-md shadow-md border border-[#d7d5d1]  justify-around mb-2  h-[3rem] ">
                <div className=" w-5/12 flex justify-center items-center font-semibold">{lesson.title}</div>
                <div className="w-full  flex   h-full  justify-end items-center p-1 ">
                
                <button
                       onClick={() => handleUrl(lesson.video)}

                      className="hover:shadow-2xl  bg-teal-600 items-center justify-center w-20 h-9  font-semibold tracking-wide text-gray-100 rounded-lg">
                        Play
                      </button>
                </div>
              </div>
              ))}
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto -z-10">
              <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                <div className="relative ">
                  <img
                    className="w-full rounded-xl "
                    src={courseDetails.courseId.image[0]}
                    alt="Colors"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-65"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <CirclePlay size={40} color="white" onClick={handlePlay} />
                  </div>
                </div>

                <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                  {courseDetails.courseId.courseName}
                </h1>
                <div className="flex space-x-5 my-4 items-center">
                  <div className="relative">
                    <div className="rounded-full w-6 h-8   md:w-8 md:h-8 bg-gray-200" />
                    <span className="absolute top-0 right-0 inline-block w-3 h-6 bg-primary-red rounded-full" />
                  </div>
                  <p className="ml-6 text-gray-800 line-clamp-3">
                    {courseDetails.courseId.instructor}
                  </p>
                </div>
                <div className="my-4">
                  <div className="flex space-x-1 items-center">
                    <h2 className="text-sky-500 font-bold text-lg">
                      &#8377; {courseDetails.courseId.coursefee}
                    </h2>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <span className="mx-2"></span>

                    <button className="px-6 py-2 rounded-md bg-yellow-300 text-gray-900 text-sm font-medium  hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300">
                      Enrolled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center"></div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default EnrolledSingleCourse;
