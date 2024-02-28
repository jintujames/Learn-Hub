import React from 'react';
import { Link } from 'react-router-dom';

function CourseCards() {
  return (
    <>
   
      <div className="my-8">
       
      </div>



      <div className="container mx-auto px-20 flex space-x-10">
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/card1.jpeg"
            alt="The complete HTML & CSS boot-camp 2023 edition"
          />
          <div className="px-4 py-2">
  <Link to="/courseDetails">
    <h2 className="text-gray-900 font-bold text-xl">
      The Complete HTML & CSS Bootcamp 2023 Edition
    </h2>
  </Link>
  <p className="text-gray-600 text-sm mt-1">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus
  </p>
</div>
         
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-sky-500 font-bold text-lg">Rs.129</h2>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
            View Course

            </button>
          </div>
        </div>
  
        {/* Repeat the above card structure for each new card */}
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/Maintaining Organizational Operations During a Shelter In Place Order - TextMarks SMS Text Messaging.jpeg"
            alt="NIKE AIR"
          />
          <div className="px-4 py-2">
            <h2 className="text-gray-900 font-bold text-xl">The Complete Web Development Course</h2>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>
          
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-sky-500 font-bold text-lg">Rs.129</h2>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              View Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCards;
