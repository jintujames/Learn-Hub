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
      {/* Second Navbar */}
      <nav className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
          <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
  <div className="hidden md:block">
    <div className="ml-10 flex items-center space-x-4">
      {/* Content for the second navbar */}
      <Link to="/Home" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="public/LearnHub Logo.png" className="h-12" alt="Learn Hub Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
          Learn Hub
        </span>
      </Link>

      <div className="hidden md:block ml-4 flex items-center md:ml-6">
        {/* Search bar */}
        <div className="pt-2 relative mx-auto text-gray-600 w-full">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>

      <Link
        to="/courses"
        className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium"
      >
        Courses
      </Link>
    </div>
  </div>
</div>

            <div className="flex items-center space-x-4 ml-auto">
              <button className="rounded-full w-10 h-10 bg-red-600 p-0 border-0 inline-flex items-center justify-center text-white">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>

              {/* Cart Button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart w-6 h-6 mt-2"
              >
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>

              {/* Register and Log In Buttons */}
              <div className="flex items-center space-x-2">
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
            </div>
</div>
          <div className="-mr-2 flex md:hidden">
            {/* ... (mobile menu button code) */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {/* ... (your existing code) */}
    </>
  );
}

export default HomeNavLogin;
function dispatch(arg0: { payload: undefined; type: "user/logout" }) {
  throw new Error("Function not implemented.");
}
