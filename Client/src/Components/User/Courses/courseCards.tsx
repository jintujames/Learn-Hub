import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllCourses,
  getCatagory,
  getTutorCourses,
} from "../../../utils/config/axios.Method.Get";
import { toast } from "react-toastify";
import { number } from "zod";
import {
  clearCourseDetails,
  setSingleCourseDetails,
} from "../../../Features/TutorSlice/courseSlice";
import { useDispatch } from "react-redux";
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
  const [data, setData]: any = useState([]);

  const [courseDetails, setCourseDetails] = useState<Course[]>([]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searcheror, setSearchError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [min, setMin] = useState<any>(0);
  const [max, setMax] = useState<any>(0);
  const [apply, setapply] = useState<boolean>(false);
  const [searchresult, setSearchResult] = useState<Course[]>([]);
  const [catagory, setCatagory]: any = useState({});
  const [selectedCat, setSelectedcat] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDropdown = (e: React.MouseEvent) => {
    const isButtonClicked = (e.target as HTMLButtonElement).classList.contains(
      "browse-category-button"
    );

    if (!isButtonClicked) {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  //------------------------------------------------------------
  const isValidAlphabetic = (value: string) => {
    return /^[a-zA-Z]+$/.test(value);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidAlphabetic(event.target.value)) {
      setSearchError("The provided value to search shulde be in Alphebetic");
      setSearch("");
    } else {
      setSearchError("");
      setSearch(event.target.value);
      console.log(event.target.value, "<= handleSortChange =>");
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };
  //------------------------------------
  const handleApply = () => {
    const data = [...courseDetails];

    const priceFilteredItems =
      min > 0 && max > 0
        ? data.filter((item: any) => {
            const courseFee = parseFloat(item.coursefee);
            return courseFee >= min && courseFee <= max;
          })
        : data;

    const categoryFilteredItems =
      selectedCat !== ""
        ? priceFilteredItems.filter(
            (item: any) => item.category === selectedCat
          )
        : priceFilteredItems;

    let sortedArray = [...categoryFilteredItems];
    if (sortOrder === "asc") {
      sortedArray = sortedArray.sort((a, b) => a.coursefee - b.coursefee);
    } else if (sortOrder === "desc") {
      sortedArray = sortedArray.sort((a, b) => b.coursefee - a.coursefee);
    }

    setSearchResult(sortedArray);
    setDropdownOpen(false);
  };
  //------------------------------------------------------------

  useEffect(() => {
    const data = courseDetails;
    setData(courseDetails);
    const serchedItem = data.filter((item: any) =>
      item.courseName.toLowerCase().startsWith(search.toLowerCase())
    );

    setSearchResult(serchedItem);
  }, [search]);

  const hanleMin = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue === "" || isNaN(inputValue)) {
      toast.error("Please enter a valid number");
      console.log("Not a valid number");
      setMin(0);
    } else {
      console.log("It is a number");
      const numericValue = parseFloat(inputValue);
      setMin(numericValue);
    }
  };

  const hanleMax = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue === "" || isNaN(inputValue)) {
      toast.error("Please enter a valid number");
      console.log("Not a valid number");
      setMax(0);
    } else {
      console.log("It is a number");
      const numericValue = parseFloat(inputValue);
      setMax(numericValue);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;
  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const page = Math.ceil(data.length / dataPerPage);
  const paginateddata = searchresult.slice(firstIndex, lastIndex);
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedcat(selectedCategory);
  };
  useEffect(() => {
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
        setSearchResult(response?.data?.courseDetails || []);
      }
    })();
  }, []);

  const handleSingleCourse = (course: any) => {
    dispatch(clearCourseDetails());
    dispatch(setSingleCourseDetails(course));

    navigate("/courseDetails");
  };

  return (
    <>
      <div className="flex justify-between items-center pb-3">
        <button
          className="text-sm font-bold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer ml-auto"
          onClick={toggleDropdown}
        >
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
                      onChange={(e) => handleSearch(e)}
                      value={search}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base mb-2">Add price range</label>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                        placeholder="Min"
                        onChange={(e) => hanleMin(e)}
                        value={min}
                      />
                      <input
                        type="text"
                        className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                        placeholder="Max"
                        onChange={(e) => hanleMax(e)}
                        value={max}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base mb-2">Filter by category</label>
                    <select
                      className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                      onChange={(e) => handleCategoryChange(e)}
                    >
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
                    <select
                      className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                      onChange={handleSortChange}
                      value={sortOrder}
                    >
                      <option value="">Sort Data</option>
                      <option value="asc">Min to Max</option>
                      <option value="desc">Max to Min</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <button
                    onClick={handleApply}
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
        {paginateddata.map((course) => (
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
              <div>
                <button
                  className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded"
                  onClick={() => handleSingleCourse(course)}
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="flex justify-center items-center rounded-lg space-x-2">
        <span
          className="text-black hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
          onClick={handlePrev}
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </span>

        {Array.from({ length: page }, (_, index) => (
  <span
    key={index + 1}
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
    </>
  );
}

export default CourseCards;
