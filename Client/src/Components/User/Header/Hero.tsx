
import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div>
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
                className="w-2/3 object-contain"
                src="public/Home screen.png"
                alt="email illustration vector art"
              />
            </div>

            <div className="w-full lg:w-2/3">
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
                  <Link to="/courses" className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400 focus:outline-none focus:ring focus:border-blue-300">
  Enroll Courses
</Link>      </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* ... (your existing code) */}
    </div>
  )
}

export default Hero
