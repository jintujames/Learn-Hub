import React, { useEffect, useState } from "react";
import { adminGetAllStudent } from "../../../utils/config/axios.Method.Get";
import { toast } from "react-toastify";
import axios from "axios";
import { adminBlockStudent, adminUnblockStudent } from "../../../utils/config/axios.Method.put";
import { User } from "firebase/auth";

function AdminUser() {

  interface User  {
    _id:any;
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    phone: string;
    password: string;
    isBlocked: boolean;
  }
  
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
        const result: any = await adminGetAllStudent();
        console.log(result.data.studentDetails);

        setData(result.data.studentDetails);
      } catch (error) {
        console.error("Error during admin get all students:", error);
      }
    };

    fetchData();
  }, [adminGetAllStudent]);

  const userStatus = async (user: User) => {
    console.log("Button Clicked");
    try {
      if (user.isBlocked === false) {
        console.log(user, "user found");
        console.log(user._id, "user id");
  
        await adminBlockStudent(user._id);
  
        user.isBlocked = true;
        toast.success("User Blocked Successfully", {
          style: { background: "#e0a7e8", color: "black" },
        });
      } else {
        // Pass the user ID to adminUnblockStudent function
        await adminUnblockStudent(user._id);
  
        user.isBlocked = false;
        toast.success("User Unblocked Successfully", {
          style: { background: "#aef2ef", color: "black" },
        });
      }
  
      // Update the user's status in local storage
      localStorage.setItem(
        `user_${user._id}_status`,
        user.isBlocked ? "Blocked" : "Unblocked"
      );
  
      setData([...data]);
    } catch (error) {
      console.error("Error in userStatus:", error);
      toast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };
  

  return (
    <>
  <div className="md:px-10 py-8 w-full mr-4 flex justify-center items-center">
    <table className="w-full lg:w-2/3 xl:w-2/2 bg-white border border-gray-300 rounded-md">
      <thead className="bg-pink-950 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Name
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Email
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Phone Number
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {paginateddata?.map((data: User, index) => (
          <tr key={index} className="border-b border-gray-300">
            <td className="w-1/3 text-left py-3 px-4">
              {`${
                (
                  data as {
                    studentFirstName?: string;
                    studentLastName?: string;
                  }
                )?.studentFirstName
              } ${
                (
                  data as {
                    studentFirstName?: string;
                    studentLastName?: string;
                  }
                )?.studentLastName
              }`}
            </td>
            <td className="text-left py-3 px-4">
              {(data as { studentEmail?: string })?.studentEmail}
            </td>
            <td className="text-left py-3 px-4">
            {(data as { phone?: string })?.phone}
            </td>
            <td className="text-left py-3 px-4">
            <button onClick={() => userStatus(data)} type="button" className={data.isBlocked === false ? "text-white bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2" : "text-gray-900 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}>
        {data.isBlocked === false ? "Block " : "UnBlock"}
      </button>
 
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
              ? "bg-black text-white"
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

export default AdminUser;
