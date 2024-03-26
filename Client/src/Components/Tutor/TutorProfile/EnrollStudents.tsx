import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TutorBaseUrl } from "../../../utils/Api";
import { useSelector } from "react-redux";

interface studentDetails {
  _id: any;
  studentFirstName: string;
  studentLastName: string
  studentEmail: string;
  phone: string;
  userId: string;
  photo: any;
}

function EnrollStudents() {
  const [userDetails, setUserDetails] = useState<studentDetails[]>([]);
  const [studenDetails, setStudentDetails] = useState<studentDetails[]>([]);

const tutorId=useSelector((state:any)=>state.tutor.tutor.tutorId)


  useEffect(() => {
    axios
      .post(`${TutorBaseUrl}/getAllStudents`,{tutorId:tutorId})
      .then((res) => {
        if (res.data.studentData) {
          console.log(res.data.studentData, "enrolled students");
          
          setUserDetails(res.data.studentData);
          setStudentDetails(res.data.students)
        } else {
          toast.error("No users found");
        }
      })
      .catch((error) => {
        toast.error("Error fetching data");
      });
  }, []);
  

  return (
    <div>
      <>
      <div className="p-6">
          <table className="mx-auto table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <th className="px-16 py-2">
                  <span className="text-gray-100 font-semibold">No</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-100 font-semibold">Name</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-100 font-semibold">Email</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-100 font-semibold">Phone</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 ">
              {studenDetails.map((user: studentDetails, index) => (
                <tr className="bg-white border-b-2 border-gray-200" key={user._id}>
                  <td>
                    <span className="text-center ml-16 font-semibold">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-18 py-2">
                    <span className="text-center ml-16">
                      {`${user.studentFirstName} ${user.studentLastName}`}
                    </span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{user.studentEmail}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{user.phone}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>

    </div>
  );
}

export default EnrollStudents;
