import React, { useEffect, useState } from "react";
import { userGetAllCategory } from "../../../utils/config/axios.Method.Get";

function FeaturedCard() {
  const [data, setData] = useState<{ categoryName?: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await userGetAllCategory();
        console.log(result.data.categoryDetails, 'PPPP');

        setData(result.data.categoryDetails);
      } catch (error) {
        // Handle the error appropriately, e.g., log it or show an error message.
        console.error("Error during admin get all tutors:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Featured Courses */}

      <h1 className="text-center text-blue-600 font-medium mb-2">
        Featured Courses
      </h1>
      <h4 className="text-center text-lg font-bold mb-2">
        Find Yours From The Featured
      </h4>

      <div className="container mx-auto px-20 flex space-x-10">
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/card1.jpeg"
            alt="The complete HTML & CSS boot-camp 2023 edition"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              The complete HTML & CSS boot-camp 2023 edition
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 b">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
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
            <h1 className="text-gray-900 font-bold text-1xl ">
              The complete web development course
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>

        {/* Repeat the above card structure for each new card */}
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/Workplace Flexibility Is Growing -- so Why Are Employees Afraid to Take Advantage of It_ _ The Motley Fool.jpeg"
            alt="NIKE AIR"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              Ultimate AWS Certified Cloud Practitioner
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>

        {/* Repeat the above card structure for each new card */}
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/Recruitment Agencies Near Me in Phoenix AZ.jpeg"
            alt="NIKE AIR"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              Complete Fitness Certification
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Must  Viewed courses */}

      <br></br>

      <br></br>

      <h1 className="text-center text-blue-600 font-medium mb-2">
        Must Viewed courses
      </h1>
      <br></br>
      <h4 className="text-center text-lg font-bold mb-2">
        Students Are Also Viewing
      </h4>

      <div className="container mx-auto px-20 flex space-x-10">
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/Recruitment Agencies Near Me in Phoenix AZ.jpeg"
            alt="The complete HTML & CSS boot-camp 2023 edition"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              The complete HTML & CSS boot-camp 2023 edition
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 b">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>

        {/* Repeat the above card structure for each new card */}
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/Workplace Flexibility Is Growing -- so Why Are Employees Afraid to Take Advantage of It_ _ The Motley Fool.jpeg"
            alt="NIKE AIR"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              The complete web development course
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>

        {/* Repeat the above card structure for each new card */}
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/card1.jpeg"
            alt="NIKE AIR"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              Ultimate AWS Certified Cloud Practitioner
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>

        {/* Repeat the above card structure for each new card */}
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="h-56 w-full object-cover mt-2"
            src="public/29 of the best Harvard University courses you can take for free.jpeg"
            alt="NIKE AIR"
          />
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-1xl ">
              Complete Fitness Certification
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-sky-500 font-bold text-xl">$129</h1>
            <button className="px-3 py-1 bg-yellow-300 text-sm text-gray-900 font-semibold rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Top Categories */}

      <br></br>


      <h1 className="text-center text-blue-600 font-medium mb-2">
        Top Categories
      </h1>
      <br></br>
      <h4 className="text-center text-lg font-bold mb-2">
        Top-Rated Study Specialties
      </h4>

      <>
        {/* component */}

        <div className="grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-4">
      {data?.map((category, index) => (
        <div key={index} className="bg-slate-200 h-12 flex shadow-lg items-center justify-center">
          <p className="text-black">{category?.categoryName}</p>
        </div>
      ))}
    </div>
      </>
    </>
  );
}

export default FeaturedCard;
