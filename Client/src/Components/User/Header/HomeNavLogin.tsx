import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentLogout } from '../../../utils/config/axios.Methode.post';
import { logout } from '../../../Features/UserSlice/userSlice';

function HomeNavLogin() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();
  useEffect(()=>{
   const data =  localStorage.getItem('Token')
   if(typeof data === "string"){
      setIsLoggedIn(true)
   }
  },[isLoggedIn])
  const handleLogout = async () => {
    try {
      await studentLogout();
      localStorage.removeItem("Token")
      setIsLoggedIn(false);
      dispatch(logout ())

      navigate("/Login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure, such as displaying an error message
    }
  };

  const handleLogin = () => {
    // Simulate successful login
       navigate('/Login')
  };

  return (
    <>
      {/* First Navbar */}
      <nav className="bg-cyan-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-9 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Content for the first navbar */}
                  <Link
                    to="/tutorLogin"
                    className="text-white hover:text-green-400 rounded-md px-3 py-2 text-sm font-medium ml-auto"
                    >
                    Become An Instructor
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <div className="relative ml-3">
                  {/* Content for the profile dropdown */}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-cyan-600 p-2 text-gray-400 hover:bg-cyan-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {/* Content for the mobile menu button */}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {/* Content for the mobile menu */}
          </div>
        </div>
      </nav>

      {/* Second Navbar */}
      <nav className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Content for the second navbar */}
                  <Link to="/Home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="public/LearnHub Logo.png" className="h-12" alt="Learn Hub Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Learn Hub</span>
                  </Link>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Search bar */}
                      <div className="max-w-md mx-auto">
                        <div className="relative flex items-center w-full h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                          <div className="grid place-items-center h-full w-15 text-gray-300">
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                          <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/" className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium">
                    Home
                  </Link>
                  <Link to="/" className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium">
                    Courses
                  </Link>
                  <Link to="/" className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium">
                    Blogs
                  </Link>
                  <Link to="/tutorSignup" className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium">
                    Become An Instructor
                  </Link>
                </div>
              </div>
            </div>

            {/* Register and Log In Buttons */}
            <div className="space-x-2">
      {isLoggedIn ? (
        // Render logout button if user is logged in
        <button onClick={handleLogout} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... rounded-md px-4 py-2 text-sm font-medium">
          Logout
        </button>
      ) : (
        // Render login button if user is not logged in
        <button onClick={handleLogin} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... rounded-md px-4 py-2 text-sm font-medium">
          Login
        </button>
      )}
    </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            {/* ... (mobile menu button code) */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="mt-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <nav className="border-t-10">
          <div className="container max-w flex items-center justify-between px-2 py-2 mx-auto">
            {/* ... your navigation content */}
          </div>
        </nav>
        <div className="container px-10 py-30 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex w-full mt-6 lg:mt-0 lg:w-2/2">
              <img
                className="w-half object-contain"
                src="public/Home screen.png"
                alt="email illustration vector art"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  Elevate Your E-Learning Journey Instantly.
                </h1>
                <br />
                <p className="mt-3 text-yellow-300">
                  Empower yourself with the knowledge and skills gained through online education! The key to your future!
                </p>
                <br />

                <div className=" mt-3  flex  flex-row  flex-wrap">
                  <input
                    type="text"
                    className=" text-gray-600  w-2/3  p-2  rounded-l-lg"
                  />
                  <button
                    className=" p-2  w-1/3   rounded-r-lg  text-white hover: bg-blue-600"
                    type="button"
                  >
                    Search Now
                  </button>
                </div>
                <br />
                <p className="mt-3 text-white">
                  500K+ People already trusted us.{' '}
                  <span className="underline text-yellow-300">View courses</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* ... (your existing code) */}
    </>
  );
}

export default HomeNavLogin;
function dispatch(arg0: { payload: undefined; type: "user/logout"; }) {
  throw new Error('Function not implemented.');
}

