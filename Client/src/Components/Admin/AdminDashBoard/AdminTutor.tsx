import React, { useEffect, useState } from "react";
import { adminGetAllInstructor } from "../../../utils/config/axios.Method.Get";
import { adminBlockTutor, adminUnblockTutor } from "../../../utils/config/axios.Method.put";
import { toast } from "react-toastify";

function AdminTutor() {

  interface Tutor  {
_id:any;
instructorFirstName: string;
  instructorLastName: string;
  instructorEmail: string;
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
        const result: any = await adminGetAllInstructor();
        console.log(result.data.instructorDetails);

        setData(result.data.instructorDetails);
      } catch (error) {
        console.error("Error during admin get all tutors:", error);
      }
    };

    fetchData();
  }, [adminGetAllInstructor]);


  const tutorStatus = async (tutor: Tutor) => {
    console.log("Button Clicked");
    try {
      if (tutor.isBlocked === false) {
        console.log(tutor, "tutor found");
        console.log(tutor._id, "tutor id");
  
        await adminBlockTutor(tutor._id);
  
        tutor.isBlocked = true;
        toast.success("Tutor Blocked Successfully", {
          style: { background: "#171616", color: "white" },
        });
      } else {
        await adminUnblockTutor(tutor._id);
  
        tutor.isBlocked = false;
        toast.success("Tutor Unblocked Successfully", {
          style: { background: "#f7f3f2", color: "black" },
        });
      }
  
      localStorage.setItem(
        `tutor_${tutor._id}_status`,
        tutor.isBlocked ? "Blocked" : "Unblocked"
      );
  
      setData(prevData => [...prevData]);
    } catch (error) {
      console.error("Error in tutorStatus:", error);
      toast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <>
  {/* component */}
  <div className="md:px-10 py-8 w-full mr-4 flex justify-center items-center flex-col">
    {/* <div className="shadow overflow-hidden rounded border-b border-gray-200"> */}
    <table className="w-full lg:w-2/3 xl:w-2/2 bg-white border border-gray-300 rounded-md">
      <thead className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-black">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Name
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Email
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Phone
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {paginateddata?.map((data: Tutor, index) => (
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
            {(data as { phone?: string })?.phone}
            </td>
            <td className="text-left py-3 px-4">
            <button onClick={() => tutorStatus(data)} type="button" className={data.isBlocked === false ? "text-black bg-sky-400 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2" : "text-white bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}>
        {data.isBlocked === false ? "Block " : "UnBlock"}
      </button>
 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <nav className="flex justify-center items-center rounded-lg space-x-2">
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

export default AdminTutor;
