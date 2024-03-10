import React from "react";
import { useSelector } from "react-redux";
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
  video: string
  }

function CourseDetails() {

  const {courseDetails}=useSelector((state:any)=>state.course)
  
  return (
    <>
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
                <div className="relative">
                  <img
                    className="w-full rounded-xl"
                    src={courseDetails.image[0]}
                    alt="Colors"
                  />
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

                  <button className="px-20 py-2 bg-yellow-300 text-gray-900 text-sm font-medium rounded hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300">
                    Buy this course
                  </button>
                  
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-cart w-6 h-6 mt-2"
                      >
                        <circle cx={9} cy={21} r={1} />
                        <circle cx={20} cy={21} r={1} />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                  
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
