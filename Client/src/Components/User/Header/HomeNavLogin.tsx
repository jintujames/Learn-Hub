import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentLogout } from "../../../utils/config/axios.Methode.post";
import { logout } from "../../../Features/UserSlice/userSlice";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux

function HomeNavLogin() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user) {
      console.log("user is here");
      navigate("/Home");
    }
  }, []);

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
      // window.history.replaceState(null,'','/')
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
          to="#"
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
        {/* navigation */}
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
                to="/"
                className="p-4  hover:text-green-500 duration-200 cursor-pointer"
              >
                Instructor
              </Link>
            </li>
            <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
              <Link
                to="/courses"
                className="p-4  hover:text-green-500 duration-200 cursor-pointer"
              >
                Courses
              </Link>
            </li>
            <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
              <Link
                to="/courses"
                className="p-4  hover:text-green-500 duration-200 cursor-pointer"
              >
                Enrolled Courses
              </Link>
            </li>
          </ul>
        </nav>
        {/* buttons -*/}
        <div className="space-x-2">
          {isLoggedIn ? (
            // Render logout button if user is logged in
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Logout
            </button>
          ) : (
            // Render login button if user is not logged in
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default HomeNavLogin;
function dispatch(arg0: { payload: undefined; type: "user/logout" }) {
  throw new Error("Function not implemented.");
}
