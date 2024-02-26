import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddLesson() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [coursefee, setCoursefee] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  const [CloudanaryURL, setCloudanaryURL] = useState("");

  type lesson = {
    courseName: string;
    courseDescription: string;
    isApproved: boolean;
    category: string;
    coursefee: number;
    video: any;
    courseLevel: string;
  };

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

  const handleAddLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handlevideoUpload();
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
              <p className="text-gray-800 font-medium">Course Bio </p>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Course Name
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose Course</option>
                  <option value="US">Web Development</option>
                  <option value="CA">Design</option>
                  <option value="FR">Business</option>
                  <option value="DE">Finance</option>
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
                  htmlFor="cus_email"
                >
                  Category
                </label>
                <select
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
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Difficulty Level
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose Level</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Price
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  placeholder="price"
                  aria-label="Email"
                />
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Course Duration
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  placeholder="duration"
                  aria-label="Email"
                />
              </div>

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
