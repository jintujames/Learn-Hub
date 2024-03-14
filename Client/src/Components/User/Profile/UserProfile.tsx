import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../utils/config/axios.Method.Get";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { login } from "../../../Features/UserSlice/userSlice";

interface studentDetails {
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  phone: string;
  userId: string;
  photo: any;

}

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<studentDetails>();
  const [photo, setPhoto] = useState<File | null>(null);
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [CloudanaryURL, setCloudanaryURL] = useState("");
  

  const userId = localStorage.getItem("userId");
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log(user, "this is is the user", userId);
    if (user) {
      console.log("user is here", user);
      navigate("/userProfile");
    } else {
      toast.error("hi");
    }
  }, []);

 
    const fetchData = async () => {
      try {
        const result: any = await getUserProfile(userId);
        setData(result.data.studentProfileDetails);
      } catch (error) {
        console.error("Error in student Profile:", error);
      }
    };
    useEffect(() => {
    fetchData();
  }, [userId, updateUI]);

  const openEditModal = () => {
    setIsEditModal(true);
    setEditProfile({
      studentFirstName: data?.studentFirstName || "",
      studentLastName: data?.studentLastName || "",
      studentEmail: data?.studentEmail|| "",
      phone: data?.phone || "",
    });
  };

  const closeEditModal = () => {
    setIsEditModal(false);
  };

 
  const handlePhotoUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", photo!);
      formData.append("upload_preset", "LearnHub");
      formData.append("cloud_name", "dhghmzt8b");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhghmzt8b/image/upload",
        formData
      );

      if (response.data && response.data.url) {
        setCloudanaryURL(response.data.url);
      } else {
        console.error("Invalid response from Cloudinary", response.data);
        toast.error("Error uploading image: Invalid response from Cloudinary");
      }
    } catch (error) {
      console.error("Error while Uploading Image:", error);
      toast.error("Error uploading image: Please try again later");
    }
  };

  const handleAddPhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!photo) {
        toast.error("No image selected");
        return;
      }

      await handlePhotoUpload();

      if (!CloudanaryURL) {
        toast.error("Error occurred while uploading the photo");
        return;
      }

      const response = await axios.post(
        `http://localhost:4001/api/v1/student/updateUserProfile`,
        {
          photo: CloudanaryURL,
          id: userId,
        }
      );

      if (response.data && response.data.user) {
        dispatch(login(response.data.user));
        setUpdateUI((prev) => !prev);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error during photo upload:", error);
      toast.error("Error occurred while uploading the photo");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserProfile(userId)

        setData(result.data.)
      }
    }
  })


 

  return (
    <div>
      <>
        <section
          className="py-6 px-8 lg:px-6 overflow-hidden relative z-2"
          data-aos="fade-up"
          id="contact"
        >
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center text-slate-900 dark:text-gray-200 lg:justify-between -mx-2">
              <div
                className="w-full lg:w-2/3 px-8 mx-auto"
                data-aos="fade-up"
                data-aos-delay={500}
                data-aos-duration={2000}
              >
                <div className="bg-gray-100 dark:bg-slate-800 relative rounded-lg p-8 sm:p-12 shadow-lg">
                  <form onSubmit={handleAddPhoto}>
                    <div className="mb-2 flex justify-center flex-col ">
                      <img
                        className="w-24 h-24 object-fill rounded-full mx-auto"
                        src={
                          data?.photo ||
                          "https://i.pinimg.com/564x/64/77/9d/64779d2b7056542722569d0278837367.jpg"
                        }
                        alt={
                          data?.photo ? "Profile picture" : "Default picture"
                        }
                      />

                      <p className="text-center text-gray-600 mt-1"></p>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className=" w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                        name="full_name"
                        id="full_name"
                        value={`${data?.studentFirstName} ${data?.studentLastName}`}
                      />
                    </div>
                    <div className="mb-2">
                      <p className="text-center text-gray-600 mt-1"></p>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                        name="email"
                        id="email"
                        value={data?.studentEmail}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="phone"
                        placeholder="Your Phone"
                        className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                        name="phone"
                        id="phone"
                        value={data?.phone}
                      />
                    </div>
                    <div className="">
                      <div className="mb-6">
                        <label
                          className="block text-sm text-gray-600"
                          htmlFor="fileInput"
                        >
                          Choose Image
                        </label>
                        <input
                          className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                          onChange={handlePhotoChange}
                          id="fileInput"
                          name="fileInput"
                          type="file"
                          accept="image/*, video/*"
                          aria-label="fileInput"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        type="submit"
                        className="
                        flex-1
                        text-gray-100
                        hover:text-gray-700
                        border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700
                        p-3
                        transition
                        ease-in-out
                        duration-500
                        hover:bg-cyan-500"
                      >
                        Update
                      </button>
                      <div className="mx-4"></div>{" "}
                      <button
                        type="submit"
                        className="
                        flex-1
                        text-gray-100
                        hover:text-gray-700
                        border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700
                        p-3
                        transition
                        ease-in-out
                        duration-500
                        hover:bg-cyan-500
                      "
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                  
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default UserProfile;
