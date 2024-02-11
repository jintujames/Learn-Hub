import React from 'react'

function NavbarLogin() {
  return (
    
    <div>
    <nav className="border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-12">
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gradient-800 md:dark:bg-transparent dark:border-gradient-700"></ul>
        </div>
        
        <div className="w-full  flex items-center justify-center">
        <div className="text-white font-bold text-xl">COURSES</div>
          </div>        
      </div>
    </nav>
  </div>
    
  )
}

export default NavbarLogin
