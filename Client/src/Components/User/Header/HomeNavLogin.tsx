import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentLogout } from "../../../utils/config/axios.Methode.post";
import { logout } from "../../../Features/UserSlice/userSlice";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import { getCatagory } from "../../../utils/config/axios.Method.Get";
import { ShoppingCart } from "react-feather";

function HomeNavLogin() {
  
  const { user } = useSelector((state: any) => state.user);
  const [catagory, setCatagory]: any = useState({});
  const [DropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const handleDropdown = () => {
    console.log("Toggling dropdown");
    setIsDropdownOpen(!DropdownOpen);
  };

  const closeDropdown = () => {
    console.log("Closing dropdown");
    setIsDropdownOpen(false);
  };

  

  useEffect(() => {
    const data = localStorage.getItem("Token");
    if (typeof data === "string") {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await studentLogout();
      localStorage.removeItem("Token");
      setIsLoggedIn(false);
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
        <Link
          to="/Home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="public/LearnHub Logo.png"
            className="h-12"
            alt="Learn Hub Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            Learn Hub
          </span>
        </Link>
        <nav className="nav font-semibold text-lg">
          <ul className="flex items-center">
            <li className="p-4 hover:text-green-500 duration-200 cursor-pointer active">
              <Link
                to="/Home"
                className="p-4 hover:text-green-500 duration-200 cursor-pointer active"
              >
                Home
              </Link>
            </li>
            <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
              <Link
                to="/tutors"
                className="p-4  hover:text-green-500 duration-200 cursor-pointer"
              >
                Tutor
              </Link>
            </li>
            <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
              <Link
                to="/courses"
                className="p-4 hover:text-green-500 duration-200 cursor-pointer"
              >
                Courses
              </Link>
            </li>
            <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
              <Link
                to="/enrolledCourses"
                className="p-4 hover:text-green-500 duration-200 cursor-pointer"
              >
                Enrolled Courses
              </Link>
            </li>
            
            
          </ul>
        </nav>
        <div className="relative ml-3 flex items-center space-x-2">
          <Link to="/cart">
            <ShoppingCart size={26} />
          </Link>
        </div>

        <div className="relative ml-3">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={DropdownOpen}
                aria-haspopup="true"
                onClick={handleDropdown}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="public/cdownload (1).jpeg"
                  alt=""
                />
              </button>
            </div>

            {DropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Link
                  to="/userProfile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={closeDropdown}
                >
                  Your Profile
                </Link>

                <Link
                  to="/Home"
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={closeDropdown}
                >
                  Settings
                </Link>
                {isLoggedIn ? (
                  <a
                    href="#"
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sign out
                  </a>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-2 text-sm font-medium text-white"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default HomeNavLogin;
function dispatch(arg0: { payload: undefined; type: "user/logout" }) {
  throw new Error("Function not implemented.");
}
