import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourseBio } from "../../../utils/config/axios.Methode.post";
import { getCatagory } from "../../../utils/config/axios.Method.Get";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

function AddCourseBio() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [coursefee, setCoursefee] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [catagory, setCatagory]: any = useState({});
  const [CloudanaryURL, setCloudanaryURL] = useState("");

  const navigate = useNavigate();

  const tutorData = useSelector((state: any) => state.tutor.tutor);

  const storedTutorId = tutorData?.tutorId;

  console.log(tutorData, storedTutorId, "storile tutorData");

  type course = {
    courseName: string;
    courseDescription: string;
    courseDuration: string;
    isApproved: boolean;
    category: string;
    coursefee: number;
    instructor: string;
    image: any;
    courseLevel: string;
    tutorId: string;
  };

  let file: any;


  const handleImageUpload = async () => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "LearnHub");
        formData.append("cloud_name", "dhghmzt8b");

        console.log("Before axios.post");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dhghmzt8b/image/upload",
          formData
        );
        console.log("After axios.post");
        console.log(response, "response");

        if (response.data && response.data.url) {
          console.log("Video uploaded successfully. URL:", response.data.url);
          setCloudanaryURL(response.data.url);
          return;
        } else {
          console.error("Invalid response from Cloudinary", response.data);
          toast.error(
            "Error uploading image: Invalid response from Cloudinary"
          );
        }
      } else {
        toast.error("No image selected");
      }
    } catch (error) {
      console.error("Error while Uploading Image:", error);
      toast.error("Error uploading image: Please try again later");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
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

  const tutorId = localStorage.getItem("tutorId");

  console.log("tutorId", tutorId);

  const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Wait for the video to be uploaded
      await handleImageUpload();

      if (!CloudanaryURL) {
        toast.error("Error occur While Uploading the Video");
        return;
      }

    const data: course = {
      image: CloudanaryURL,
      courseName,
      courseDescription,
      isApproved: true,
      category,
      instructor: tutorId || "",
      coursefee: Number(coursefee),
      courseLevel,
      tutorId: storedTutorId,
      courseDuration: ""
    };
    console.log(data, "dataaa");

    axios.post(`http://localhost:4001/api/v1/tutor/addCourse`, {
      courseName,
      courseDescription,
        category,
        courseLevel,
        instructor: tutorId,
        coursefee,
         image: data.image
      });

      setTimeout(() => {
        toast.success("Course Added Successfully");
        navigate("/myCourse");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred While Adding");
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
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Course Duration
            </label>
            <input
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="duration"
              name="duration"
              type="text"
              placeholder="Duration"
              aria-label="Duration"
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
                onChange={handleImage}
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
