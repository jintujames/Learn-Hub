import React from 'react';

const Navbar: React.FC = () => {
  return (
<nav className="border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="public/LearnHub Logo.png" className="h-12" alt="Learn Hub Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Learn Hub</span>
          </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg md:hidden hover:bg-gradient-to-r hover:from-indigo-500 hover:via-sky-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-gradient-200 dark:text-gradient-400 dark:hover:bg-gradient-700 dark:focus:ring-gradient-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gradient-800 md:dark:bg-transparent dark:border-gradient-700">
            
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
