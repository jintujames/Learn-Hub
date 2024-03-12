import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";

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

function courseView() {
  const [lesson, setLesson]: any = useState<Course[]>([]);
  const { courseDetails } = useSelector((state: any) => state.course);

  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  const handleCloseVideoModal = () => {
    window.location.reload();
    setCurrentVideoUrl("");
    setShowVideoModal(false);
  };

  const handleUrl = (url: any) => {
    setCurrentVideoUrl(url);
    setShowVideoModal(true);
  };

  const handlePlayClick: any = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  return (
    <>
      {showVideoModal && (
        <VideoPlayer
          videoUrl={currentVideoUrl}
          setShowVideoModal={setShowVideoModal}
          setCurrentVideoUrl={setCurrentVideoUrl}
        />
      )}
      <div className="w-[100%] pt-32 overflow-auto flex gap-4 p-5 h-screen">
        <div className="flex-auto flex-row  w-[100%] h-[48rem] p-1">
          <div className="w-[1000] flex-1 rounded-md shadow-md border border-[#d7d5d1] bg-[#f3f2f0] mb-2 p-4 h-[22rem]">
            <div className="w-[1000] mb-1 flex-2 rounded-md    bg-slate-300 h-[15rem]">
              <img
                className="w-full rounded-md   h-full object-cover"
                src={courseDetails.image[0]}
                alt="course image"
              />
            </div>
            <div className="w-[100%] p-5 flex  justify-between flex-2 h-[5rem]">
              <span className="text-2xl pt-3 text-teal-600"></span>
              <div className="flex    justify-between w-[10rem]">
                <div className="w-[100%] ">
                  <button
                    onClick={() =>
                      handleUrl(courseDetails.courseLessons[0].video)
                    }
                    className="hover:shadow-2xl ml-5 bg-teal-600 items-center justify-center w-full py-4 font-semibold tracking-wide text-gray-100 rounded-lg"
                  >
                    Play Video
                  </button>
                </div>
              </div>
            </div>
          </div>

          {courseDetails.courseLessons.length > 0 && (
            <>
              {courseDetails.courseLessons.map((lesson: any, index: number) => (
                <div
                  key={index}
                  className="w-[1000] flex-1 rounded-md shadow-md border border-[#d7d5d1] bg-[#f3f2f0] mb-2 p-4 h-[7rem]"
                >
                  <div>Lesson {index + 1}</div>
                  <div className="w-[100%] p-5 flex justify-between flex-2 h-[2rem]">
                    <span className="text-2xl pt-3 text-teal-600"></span>
                    <div className="flex justify-between w-[10rem]">
                      {lesson.title}
                      <div className="w-[80%]">
                        <button
                          onClick={() => handleUrl(lesson.video)}
                          className="hover:shadow-2xl ml-5 bg-teal-600 items-center justify-center w-full py-2 font-semibold tracking-wide text-gray-100 rounded-lg"
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex-auto h-screen mb-3 p-2 w-[80%]">
          <div className="col-span-2 h-[18rem] p-5 pt-4 overflow-auto shadow-xl  rounded-xl bg-gray-100 row-span-7 col-start-4">
            <span className="text-xl font-bold">
              {courseDetails.courseName}
            </span>
            <h1 className="mt-3 text-stone-500">
              {courseDetails.courseDescription}
            </h1>
            <div className="mt-4   flex-auto">
              <span className="font-bold">
                Category : {courseDetails.category}
              </span>
              <span className=" text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"></span>
            </div>
            <div className="mt-4   flex-auto">
              <span className="text-xl font-bold">Course Details :</span>
              <h1 className="mt-3 text-black">Rs: {courseDetails.coursefee}</h1>
              <h1 className="mt-3 text-black">5 hrs</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default courseView;
