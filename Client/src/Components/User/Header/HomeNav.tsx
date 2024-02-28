import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function HomeNav() {
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user) {
      console.log("user is here");
      navigate("/Home");
    }
  }, []);

  return (
    <>
      <>
        {/* component */}
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
                  to="/"
                  className="p-4 hover:text-green-500 duration-200 cursor-pointer active"
                >
                  Home
                </Link>
              </li>
              <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
                <Link
                  to="/instructor"
                  className="p-4  hover:text-green-500 duration-200 cursor-pointer"
                >
                  Tutors
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
                  to="/tutorsignup"
                  className="p-4  hover:text-green-500 duration-200 cursor-pointer"
                >
                  Become An Instructor
                </Link>
              </li>
            </ul>
          </nav>
          {/* buttons -*/}
          <div className="space-x-2">
            <Link
              to={`/signup`}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... rounded-md px-4 py-2 text-white text-sm font-medium"
            >
              Sign Up
            </Link>
            <Link
              to={`/login`}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... rounded-md px-4 py-2 text-white text-sm font-medium"
            >
              Log In
            </Link>
          </div>
        </header>

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
                  <h1 className="text-3xl font-semibold text-white dark:text-white lg:text-4xl">
                    Elevate Your E-Learning Journey Instantly.
                  </h1>
                  <br />
                  <p className="mt-3 text-yellow-300">
                    Empower yourself with the knowledge and skills gained
                    through online education! The key to your future!
                  </p>
                  <br />

                  <div className="mt-3  flex  flex-row  flex-wrap">
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
                    500K+ People already trusted us.{" "}
                    <span className="underline text-yellow-300">
                      View courses
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    </>
  );
}

export default HomeNav;
