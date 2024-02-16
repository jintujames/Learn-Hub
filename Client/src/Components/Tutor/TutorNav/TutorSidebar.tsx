import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tutorLogout } from "../../../utils/config/axios.Methode.post";
import { logout } from "../../../Features/TutorSlice/tutorSlice";
import TutorBio from "../TutorProfile/TutorBio";

function TutorSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await tutorLogout();
      localStorage.removeItem("Token");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* component */}
      {/* component */}
      <div className="flex bg-white">
        <div className="md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden">
          <div className="mx-auto py-2">
            <img
              className="w-25 h-28 rounded-full mx-auto"
              src="https://picsum.photos/200"
              alt="Profile picture"
            />
            <h2 className="text-center text-2xl font-semibold mt-3">
              John Doe
            </h2>
            <p className="text-center text-gray-600 mt-1">Software Engineer</p>

            <div className="flex items-center space-x-2 mx-auto py-2"></div>

            <ul>
              <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-semibold">Profile</span>
              </li>
              <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold">Image</span>
              </li>
              <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
                <span className="font-semibold">My Course</span>
              </li>
              <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-semibold">Sales History</span>
              </li>

              <button className="w-44 mt-12 bg-cyan-500 rounded-full py-1.5 text-white">
                Add New Course
              </button>
            </ul>
          </div>
        </div>

        <div className="w-4/5">
          <main className=" w-full bg-white border-l">
            <nav className="flex items-center justify-between px-10 bg-white py-6 border-b">
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-96">
                <input
                  type="text"
                  placeholder="search"
                  className="bg-gray-100 outline-none w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://picsum.photos/200"
                    alt="Profile picture"
                  />
                  <div className="ml-2">
                    <h2 className="text-sm font-medium">John Doe</h2>
                  </div>
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="relative">
                      {isMenuOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Account settings
                            </a>

                            <button
                              onClick={handleLogout}
                              type="button"
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Log Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </main>
          <div className="w-3/5">
            <TutorBio />
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorSidebar;
