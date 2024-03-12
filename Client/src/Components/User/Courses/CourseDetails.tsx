import React, { useEffect, useState } from "react";
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
import { CirclePlay } from "lucide-react";
import UserVideoPlayer from "./UserVideoPlayer";
import axios from "axios";
import { toast } from "react-toastify";
function CourseDetails() {
  const userData = JSON.parse(localStorage.getItem("") || "{}");
  const { courseDetails } = useSelector((state: any) => state.course);

  const [userId, setuserId]: any = useState("");

  const [videoUrl, setVideoUrl] = useState(null);
  const [isClick, setisClick] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("userId"), "USER ID FROM LOCAL STORAGE");
    const data: any = localStorage.getItem("userId");

    setuserId(data);
    console.log(userId);
  }, [userId]);
  const handlePlay = () => {
    setisClick(true);
    setVideoUrl(courseDetails.courseLessons[0].video);
  };

  const handleAddToCart = () => {
    if (userId) {
      axios
        .post(`http://localhost:4001/api/v1/student/addToCart`, {
          courseId: courseDetails?._id,
          userId: userId,
        })
        .then((response) => {
          console.log(response, "added to cart");
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.error("Error occur while adding to cart", error);
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please log in to add the course to your cart.");
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
                  <p className="ml-6 text-gray-800 line-clamp-3">John Doe</p>
                </div>
                <div className="my-4">
                  <div className="flex space-x-1 items-center">
                    <h2 className="text-sky-500 font-bold text-lg">
                      &#8377; 529
                    </h2>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <span className="mx-2"></span>

                    <button className="px-6 py-2 bg-yellow-300 text-gray-900 text-sm font-medium rounded hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300">
                      Buy this course
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="px-6 py-2 bg-yellow-300 text-gray-900 text-sm font-medium rounded hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300"
                    >
                      Add To Cart
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

export default CourseDetails;
