import React, { useEffect, useState } from "react";
import { adminGetAllInstructor } from "../../../utils/config/axios.Method.Get";

function AdminTutor() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const page = Math.ceil(data.length / dataPerPage);
  const paginateddata = data.slice(firstIndex, lastIndex);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page != currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await adminGetAllInstructor();
        console.log(result.data.instructorDetails);

        setData(result.data.instructorDetails);
      } catch (error) {
        // Handle the error appropriately, e.g., log it or show an error message.
        console.error("Error during admin get all tutors:", error);
      }
    };

    fetchData();
  }, [adminGetAllInstructor]);

  return (
    <>
  {/* component */}
  <div className="md:px-10 py-8 w-full mr-4 flex justify-center items-center">
    {/* <div className="shadow overflow-hidden rounded border-b border-gray-200"> */}
    <table className="w-full lg:w-2/3 xl:w-2/2 bg-white border border-gray-300 rounded-md">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Name
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Email
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Status
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {paginateddata?.map((data, index) => (
          <tr key={index} className="border-b border-gray-300">
            <td className="w-1/3 text-left py-3 px-4">
              {`${
                (
                  data as {
                    instructorFirstName?: string;
                    instructorLastName?: string;
                  }
                )?.instructorFirstName
              } ${
                (
                  data as {
                    instructorFirstName?: string;
                    instructorLastName?: string;
                  }
                )?.instructorLastName
              }`}
            </td>
            <td className="text-left py-3 px-4">
              {(data as { instructorEmail?: string })?.instructorEmail}
            </td>
            <td className="text-left py-3 px-4">
              <button className="px-1 py-1 bg-blue-300 hover:bg-yellow-600 text-white text-sm font-medium rounded-full">
                Active
              </button>
            </td>
            <td className="text-left py-3 px-4">
              <label className="relative inline-flex items-center mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <nav className="flex justify-start items-center rounded-lg space-x-2">
      <span
        className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
        onClick={handlePrev}
      >
        <span aria-hidden="true">«</span>
        <span className="sr-only">Previous</span>
      </span>
      {Array.from({ length: page }, (_, index) => (
        <span
          key={index + 1}
          className={`w-10 h-10 ${
            currentPage === index + 1
              ? "bg-teal-600 text-white"
              : "text-gray-500 hover:text-teal-600"
          } p-4 inline-flex items-center text-sm font-medium rounded-full`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      <span
        className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
        onClick={handleNext}
      >
        <span className="sr-only">Next</span>
        <span aria-hidden="true">»</span>
      </span>
    </nav>  
  </div>
</>

  );
}

export default AdminTutor;
