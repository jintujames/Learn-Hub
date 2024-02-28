import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourseBio } from "../../../utils/config/axios.Methode.post";
import { getCatagory } from "../../../utils/config/axios.Method.Get";
import { useSelector } from "react-redux";

function AddCourseBio() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [coursefee, setCoursefee] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [catagory,setCatagory]:any=useState({})
  const navigate = useNavigate();

  const tutorData = useSelector((state : any) => state.tutor.tutor);

  const storedTutorId = tutorData?.tutorId;

  console.log(tutorData, storedTutorId , 'storile tutorData')


  type course = {
    courseName: string;
    courseDescription: string;
    isApproved: boolean;
    category: string;
    coursefee: number;
    instructor : string;
    image: any;
    courseLevel: string;
    tutorId : string
  };

  let file: any;

  const handleChange = (e: any) => {
    // formData = new FormData()
    file = e?.target?.files?.[0];
    // formData.append("image", file )
  };

  useEffect(()=>{
    console.log('hihiihi');
    
    (async ()=>{
        const response:any=await getCatagory()
        console.log('this is catogary',response?.data);
        
        if(response){
          setCatagory(response?.data?.categoryDetails)
        }
    })()
  },[])

  const tutorId = localStorage.getItem("tutorId");

  console.log("tutorId",tutorId)

  const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: course = {
      image: file,
      courseName,
      courseDescription,
      isApproved: true,
      category,
      instructor: tutorId||"",
      coursefee: Number(coursefee),
      courseLevel,
      tutorId : storedTutorId
    };
    console.log(data, "dataaa");

    try {
      await addCourseBio(data);
      console.log("Course added successfully");
      navigate("/myCourse", { replace: true });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  

  return (
    <>
      <div className="leading-loose">
        <form
          onSubmit={handleAddCourse}
          encType="multipart/form-data"
          className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
        >
          <p className="text-gray-800 text-center font-medium">Create Course</p>
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
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              aria-label="Description"
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Category
            </label>
            <select
  onChange={(e) => setCategory(e.target.value)}
  id="categories"
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
  <option value="">Choose category</option>
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
          {/* <div className="inline-block mt-2 w-1/2 pr-1">
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
          </div> */}
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
          <div className="">
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="fileInput"
                  >
                    Choose Image
                  </label>
                  <input
                    className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                    onChange={handleChange}
                    id="fileInput"
                    name="fileInput"
                    type="file"
                    accept="image/*, video/*"
                    aria-label="fileInput"
                  />
                </div>
              </div>

          <div className="flex items-center justify-between">
            <button
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
