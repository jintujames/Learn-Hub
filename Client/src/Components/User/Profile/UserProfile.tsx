import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../utils/config/axios.Method.Get";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { login } from "../../../Features/UserSlice/userSlice";
import { editUserProfile } from "../../../utils/config/axios.Methode.post";
import { UserBaseUrl } from "../../../utils/Api";

interface studentDetails {
  _id: any;
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
  const [isEditModal, setIsEditModal] = useState(false);
  const [editProfile, setEditProfile] = useState<any>({
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    phone: "",
  });

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
      studentEmail: data?.studentEmail || "",
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
      console.log("Photo upload successful. Cloudinary URL:", response.data.url);
      return response.data.url
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
  
   const url =    await handlePhotoUpload();
  
      if (!url) {
        toast.error("Error occurred while uploading the photo=========");
        return;
      }
  
      console.log("Cloudinary URL:", CloudanaryURL); // Log Cloudinary URL
  
      const response = await axios.post(
        `${UserBaseUrl}/updateUserProfile`,
        {
          photo: url,
          id: userId,
        }
      );
  
      console.log("Update Profile Response:", response.data); // Log response
  
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
        const result: any = await getUserProfile(userId);
        console.log("user details", result.data);

        const { studentFirstName, studentLastName, studentEmail, phone } =
          result.data;

        setEditProfile({
          studentFirstName,
          studentLastName,
          studentEmail,
          phone,
        });
      } catch (error) {
        console.log("Error in fetching tutor Bio:", error);
      }
    };

    fetchData();
  }, [getUserProfile, userId]);

  const handleEditProfile = async () => {
    if (!data || !data._id) {
      console.error("Invalid data or ID");
      return;
    }

    try {
      const response: any = await editUserProfile(editProfile, data._id);
      console.log("Edit profile response:", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchData();
        setIsEditModal(false);
      } else {
        toast.error(response.data.message || "Failed to edit profile");
      }
    } catch (error) {
      console.error("Error editing profile:", error);
      toast.error("Failed to edit profile. Please try again later.");
    }
  };

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
                        onClick={() => openEditModal()}
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
                  {isEditModal && (
                    <div
                      className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
                      style={{ background: "rgba(0,0,0,.7)" }}
                      onClick={closeEditModal}
                    >
                      <div
                        className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <form>
                          <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                              <p className="text-2xl font-bold">Edit Profile</p>
                              <div
                                className="modal-close cursor-pointer z-50"
                                onClick={closeEditModal}
                              >
                                <svg
                                  className="fill-current text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={18}
                                  height={18}
                                  viewBox="0 0 18 18"
                                >
                                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                </svg>
                              </div>
                            </div>
                            <div className="my-5">
                              <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                First Name
                              </label>
                              <input
                                value={`${editProfile.studentFirstName}`}
                                type="text"
                                id="firstName"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your first name here"
                                onChange={(e) =>
                                  setEditProfile({
                                    ...editProfile,
                                    studentFirstName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="my-5">
                              <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Last Name
                              </label>
                              <input
                                value={`${editProfile.studentLastName}`}
                                type="text"
                                id="firstName"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your first name here"
                                onChange={(e) =>
                                  setEditProfile({
                                    ...editProfile,
                                    studentLastName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="my-5">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                value={editProfile.studentEmail}
                                type="text"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email here"
                                onChange={(e) =>
                                  setEditProfile({
                                    ...editProfile,
                                    studentEmail: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="my-5">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Phone Number
                              </label>
                              <input
                                value={editProfile.phone}
                                type="text"
                                id="phone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your phone number here"
                                onChange={(e) =>
                                  setEditProfile({
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                onClick={() => {
                                  closeEditModal();
                                }}
                                className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  handleEditProfile();
                                  closeEditModal();
                                }}
                                type="submit"
                                className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
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
