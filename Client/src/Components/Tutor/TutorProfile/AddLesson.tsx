import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  addCourseBio,
  addCourseLesson,
} from "../../../utils/config/axios.Methode.post";
import {
  getCatagory,
  getTutorCourses,
} from "../../../utils/config/axios.Method.Get";

function AddLesson() {
  const tutorId = localStorage.getItem("tutorId");

  const [courseNames, setCourseNames] = useState<[]>([]);

  const [title, setTitle] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<[]>([]);
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  const [CloudanaryURL, setCloudanaryURL] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState<string>("");

  const navigate = useNavigate();

  type lesson = {
    courseName: string;
    Description: string;
    title: string;
    isApproved: boolean;
    category: string;
    courseLevel: string;
    video: any;
  };
  

  let file: any;

  const handlevideoUpload = async () => {
    try {
      if (video) {
        const formData = new FormData();
        formData.append("file", video);
        formData.append("upload_preset", "LearnHub");
        formData.append("cloud_name", "dhghmzt8b");

        console.log("Before axios.post");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dhghmzt8b/video/upload",
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

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  useEffect(() => {

    (async () => {
      const response: any = await getCatagory();
      console.log("this is catogary", response?.data);

      if (response) {
        setCategoryOptions(response?.data?.categoryDetails || []);
      }
    })();
  }, []);

  useEffect(() => {
    axios
    getTutorCourses(tutorId)
      .then((res: any) => {
        console.log(res, "ffffffffff");
        setCourseNames(res.data.courseDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Wait for the video to be uploaded
      await handlevideoUpload();

      if (!CloudanaryURL) {
        toast.error("Error occur While Uploading the Video");
        return;
      }
  
      const data: lesson = {
        courseName: selectedCourseName,
        Description,
        title,
        isApproved: true,
        category,
        courseLevel,
        video: CloudanaryURL,
      };
  
      console.log(data, "dataaassssssss");
  
      // Send the request to the backend
    axios.post(
        `http://localhost:4001/api/v1/tutor/addLesson`,
        {
          courseName: data.courseName,
          title,
          description: data.Description,
          category,
          courseLevel,
          tutor: tutorId,
          video: data.video,
        }
      );
  
      
      setTimeout(() => {
        toast.success("Lesson Added Successfully");
        navigate("/myCourse");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred While Adding");
    }
  };
  
  
  return (
    <div>
      <div>
        <>
          <div className="leading-loose">
            <form
              onSubmit={handleAddLesson}
              encType="multipart/form-data"
              className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
            >
              <p className="text-gray-800 text-center font-medium">
                Add Lesson
              </p>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Course Name
                </label>
                <select
                  onChange={(e) => setSelectedCourseName(e.target.value)}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose Course</option>
                  {courseNames?.map((course: any) => (
                    <option key={course._id} value={course._id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Description
                </label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description"
                  aria-label="description"
                />
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose category</option>
                  {
                    categoryOptions.map((item: any) => (
                      <option key={item._id} value={item.categoryName}>
                        {item.categoryName}
                      </option>
                    ))
                  
                  }
                </select>
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className="block text-sm text-gray-600" htmlFor="level">
                  Difficulty Level
                </label>
                <select
                  id="level"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                >
                  <option value="">Choose Level</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className="block text-sm text-gray-600" htmlFor="price">
                  Title
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  placeholder="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="duration"
                >
                  Course Duration
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="duration"
                  aria-label="duration  "
                />
              </div> */}

              <p className="mt-4 text-gray-800 font-medium">Video</p>
              <div className="">
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="fileInput"
                  >
                    Choose Image or Video
                  </label>
                  <input
                    className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                    onChange={handleVideo}
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
                  Add Lesson
                </button>
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
}

export default AddLesson;