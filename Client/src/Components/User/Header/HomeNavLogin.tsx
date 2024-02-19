import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate,} from 'react-router-dom';
import { studentLogout } from '../../../utils/config/axios.Methode.post';
import { logout } from '../../../Features/UserSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch from react-redux


function HomeNavLogin() {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const { user } = useSelector( (state:any) => state.user)

  useEffect ( () =>{
    if(user){
      console.log("user is here");
      navigate('/Home',)
    }
  },[])

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
      dispatch(logout())
      // window.history.replaceState(null,'','/')
      navigate("/",{replace:true});  
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
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
                  <Link to="/Home" className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium">
                    Home
                  </Link>
                  <Link to="/courses" className="text-black hover:text-blue-700 rounded-md px-3 py-2 text-sm font-medium">
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

      

      {/* Main Content */}
      {/* ... (your existing code) */}
    </>
  );
}

export default HomeNavLogin;
function dispatch(arg0: { payload: undefined; type: "user/logout"; }) {
  throw new Error('Function not implemented.');
}

