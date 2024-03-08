import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCourses,
  getCatagory,
  getTutorCourses,
} from "../../../utils/config/axios.Method.Get";
import { toast } from "react-toastify";

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

function CourseCards() {
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    const isButtonClicked = (e.target as HTMLButtonElement).classList.contains('browse-category-button');
  
    if (!isButtonClicked) {
      setDropdownOpen(!isDropdownOpen);
    }
  };
  
  const [catagory, setCatagory]: any = useState({});

  useEffect(() => {
    console.log("hihiihi");

    (async () => {
      const response: any = await getCatagory();
      console.log("this is catogary", response?.data);

      if (response) {
        setCatagory(response?.data?.categoryDetails);
      }
    })();
  }, []);

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
      <div
        className="flex justify-between items-center pb-3"
        onClick={toggleDropdown}
      >
        <button className="text-sm font-bold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer ml-auto">
          Browse Category
        </button>

        {isDropdownOpen && (
          <div className="absolute top-0 right-0 mt-14">
            <div className="w-[75rem] ml-[6.4rem] pt-5 p-5 pb-8 rounded-lg  shadow-md mr-16 h-auto border border-slate-50 bg-gray-200">
              <div className="container mx-auto p-2">
                <div className="flex items-start space-x-6">
                  <div className="flex flex-col">
                    <label htmlFor="searchInput" className="text-base mb-2">
                      Search courses
                    </label>
                    <input
                      type="text"
                      id="searchInput"
                      className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                      placeholder="Search for items"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base mb-2">Add price range</label>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                        placeholder="Min"
                      />
                      <input
                        type="text"
                        className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base mb-2">Filter by category</label>
                    <select className="p-2 text-base border rounded focus:outline-none focus:border-teal-500">
                      <option value="">Select the category</option>
                      {catagory.length > 0 ? (
                        catagory.map((item: any) => (
                          <option key={item._id} value={item.categoryName}>
                            {item.categoryName}
                          </option>
                        ))
                      ) : (
                        <option value="NoCategory">No category</option>
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base mb-2">Sort Data</label>
                    <select className="p-2 text-base border rounded focus:outline-none focus:border-teal-500">
                      <option value="">Sort Data</option>
                      <option value="asc">Min to Max</option>
                      <option value="desc">Max to Min</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <button
                    type="button"
                    className="py-2  px-4 mt-5 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-500 transition-all text-sm"
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    className="py-2 px-4 mt-5 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-500 transition-all text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-20 flex flex-wrap space-x-4">
        {courseDetails.map((course) => (
          <div
            key={course._id}
            className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mb-4"
          >
            <img
              className="h-56 w-full object-cover mt-2"
              src={course?.image[0]}
              alt="fegrthgthb"
            />
            <div className="px-4 py-2">
              <Link to={`/courseDetails/${course._id}`}>
                <h2 className="text-gray-900 font-bold text-xl">
                  {course?.courseName}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm mt-1"></p>
            </div>

            <div className="flex items-center justify-between px-4 py-2">
              <h2 className="text-sky-500 font-bold text-lg">
                Rs. {course?.coursefee}
              </h2>
              <Link to="/courseDetails">
                <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
                  View Course
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CourseCards;
