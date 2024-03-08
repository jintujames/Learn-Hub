import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentLogout } from "../../../utils/config/axios.Methode.post";
import { logout } from "../../../Features/UserSlice/userSlice";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import { getCatagory } from "../../../utils/config/axios.Method.Get";
import { ShoppingCart } from "react-feather";



function HomeNavLogin() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const [DropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    console.log("Toggling dropdown");
    setIsDropdownOpen(!DropdownOpen);
  };

  const closeDropdown = () => {
    console.log("Closing dropdown");
    setIsDropdownOpen(false);
  };

  
  const [catagory, setCatagory]: any = useState({});

  useEffect(() => {
    console.log("hihiihi");

    (async () => {
      const response: any = await getCatagory();
      console.log("this is catogary", response?.data);

      if (response) {
        setCatagory(response?.data?.categoryDetails);
      }
    })();
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
                to="/courses"
                className="p-4  hover:text-green-500 duration-200 cursor-pointer"
              >
                Tutor
              </Link>
            </li>
             <li className="p-4  hover:text-green-500 duration-200 cursor-pointer">
             <Link to="/courses" className="p-4 hover:text-green-500 duration-200 cursor-pointer">
  Courses
</Link>
            </li>
            <li
              className="p-4 hover:text-green-500 duration-200 cursor-pointer"
              onClick={toggleDropdown}
            >
              
              Browse Categories
            </li>

            {isDropdownOpen && (
              <div className="absolute top-0 right-0 mt-14">
                <div className="w-[75rem] ml-[6.4rem] pt-5 p-5 pb-8 rounded-lg  shadow-md mr-16 h-auto border border-slate-50 bg-gray-200">
                  <div className="container mx-auto p-2">
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col">
                        <label htmlFor="searchInput" className="text-base mb-2">
                          Search courses
                        </label>
                        <input
                          type="text"
                          id="searchInput"
                          className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                          placeholder="Search for items"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-base mb-2">Add price range</label>
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                            placeholder="Min"
                          />
                          <input
                            type="text"
                            className="p-2 text-base border rounded focus:outline-none focus:border-teal-500"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-base mb-2">
                          Filter by category
                        </label>
                        <select className="p-2 text-base border rounded focus:outline-none focus:border-teal-500">
                          <option value="">Select the category</option>
                          {catagory.length > 0 ? (
                                            catagory.map((item: any) => (
                                              <option key={item._id} value={item.categoryName}>
                                                                    {item.categoryName}



                                                                    </option>
                ))
              ) : (
                <option value="NoCategory">No category</option>
              )}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-base mb-2">Sort Data</label>
                        <select className="p-2 text-base border rounded focus:outline-none focus:border-teal-500">
                          <option value="">Sort Data</option>
                          <option value="asc">Min to Max</option>
                          <option value="desc">Max to Min</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-start space-x-6">
                      <button
                        type="button"
                        className="py-2  px-4 mt-5 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-500 transition-all text-sm"
                      >
                        Apply
                      </button>

                      <button
                        type="button"
                        className="py-2 px-4 mt-5 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-500 transition-all text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

           
          </ul>
        </nav>
        <div className="relative ml-3 flex items-center space-x-2">
  {/* Your other content */}
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
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>

      {DropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Dropdown content */}
          <Link to="/userProfile" className="block px-4 py-2 text-sm text-gray-700" onClick={closeDropdown}>
  Your Profile
</Link>

<Link to="/Home" className="block px-4 py-2 text-sm text-gray-700" onClick={closeDropdown}>
  Settings
</Link>
          {isLoggedIn ? (
    // Render logout button if user is logged in
    <a
      href="#"
      onClick={() => {
        handleLogout();
        closeDropdown(); // Close the dropdown after logging out
      }}
      className="block px-4 py-2 text-sm text-gray-700"
    >
      Sign out
    </a>
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
      )}
    </div>
   
</div>


 
        {/* <div className="space-x-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Login
            </button>
          )}
        </div> */}
      </header>
    </>
  );
}

export default HomeNavLogin;
function dispatch(arg0: { payload: undefined; type: "user/logout" }) {
  throw new Error("Function not implemented.");
}
