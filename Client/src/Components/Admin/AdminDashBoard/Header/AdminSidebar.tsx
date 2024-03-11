import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../../utils/config/axios.Methode.post';
import { logout } from '../../../../Features/AdminSlice/adminSlice';

function AdminSidebar() {


  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(()=>{
    const data =  localStorage.getItem('Token')
    if(typeof data === "string"){
       setIsLoggedIn(true)
    }
   },[isLoggedIn])
   
  const handleLogout = async () => {
    try {
      await adminLogout();
      localStorage.removeItem("Token")
      dispatch(logout())

      navigate("/adminLogin");  
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  
    return (
      
<aside className="flex flex-col w-64 h-screen px-5 py-12 overflow-y-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... dark:bg-gray-900 dark:border-black">
  <div className="flex items-center space-x-3 rtl:space-x-reverse">
    <img src="public/LearnHub Logo.png" className="h-12 rounded-full" alt="Learn Hub Logo" />
    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Learn Hub</span>
  </div>
  <div className="flex flex-col justify-between flex-1 mt-8">
    <nav className="-mx-3 space-y-6">
      <div className="space-y-3">
        <Link
          to="/adminDashboard"
          className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          📊
          <span className="mx-2 text-sm font-medium">Dashboard</span>
        </Link>
      </div>
      <div className="space-y-3">
        <Link
          to="/adminCategory"
          className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          📂
          <span className="mx-2 text-sm font-medium">Category</span>
        </Link>
        {/* Other menu items */}
      </div>
      <div className="space-y-3">
        <Link
          to="/adminStudent"
          className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          🎓
          <span className="mx-2 text-sm font-medium">Students</span>
        </Link>
        {/* Other menu items */}
      </div>
      <div className="space-y-3">
        <Link
          to="/adminTutor"
          className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          👩‍🏫
          <span className="mx-2 text-sm font-medium">Tutor</span>
        </Link>
        {/* Other menu items */}
      </div>
      <div className="space-y-3">
        
     
        <Link onClick={handleLogout}
          to="/adminLogin"
          className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          🚪
          <span className="mx-2 text-sm font-medium">Logout</span>
        </Link>
      </div>
    </nav>
  </div>
</aside>

    );
  }
  

export default AdminSidebar
