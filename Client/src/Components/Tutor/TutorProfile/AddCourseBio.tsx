import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourseBio } from "../../../utils/config/axios.Methode.post";

function AddCourseBio() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [coursefee, setCoursefee] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  type course = {
    courseName: string;
    courseDescription: string;
    isApproved: boolean;
    category: string;
    coursefee: number;
    image: any;
    courseLevel: string;
  };

  let file: any;

  const handleChange = (e: any) => {
    // formData = new FormData()
    file = e?.target?.files?.[0];
    // formData.append("image", file )
  };

  const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: course = {
      image: file,
      courseName,
      courseDescription,
      isApproved: true,
      category,
      coursefee: Number(coursefee),
      courseLevel,
    };
    console.log(data, "dataaa");

    try {
      await addCourseBio(data);
      console.log("Course added successfully");
      navigate("/addLesson", { replace: true });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleAddLesson = () => {
    navigate("/tutorProfile/addLesson");
  };

  return (
    <>
      <div className="leading-loose">
        <form
          onSubmit={handleAddCourse}
          encType="multipart/form-data"
          className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
        >
          <p className="text-gray-800 font-medium">Course Bio </p>
          <div className="">
            <label className="block text-sm text-gray-00" htmlFor="cus_name">
              Course Title
            </label>
            <input
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="courseName"
              name="courseName"
              type="text"
              placeholder="courseName"
              aria-label="courseName"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Description
            </label>
            <input
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              placeholder="Your Email"
              aria-label="Email"
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose category</option>
              <option value="US">Web Development</option>
              <option value="CA">Design</option>
              <option value="FR">Business</option>
              <option value="DE">Finance</option>
            </select>
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Difficulty Level
            </label>
            <select
              onChange={(e) => setCourseLevel(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose category</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Price
            </label>
            <input
              onChange={(e) => setCoursefee(e.target.value)}
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              placeholder="price"
              aria-label="Email"
            />
          </div>

          <p className="mt-4 text-gray-800 font-medium">Image</p>
          <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
            <label
              htmlFor="upload"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 fill-white stroke-indigo-500"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-600 font-medium">
                Upload Image
              </span>
            </label>
            <input
              id="upload"
              type="file"
              name="image"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleAddLesson}
              type="submit"
              className="w-44 mt-2 border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700 border-2 rounded-md py-1.5 text-white"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCourseBio;
