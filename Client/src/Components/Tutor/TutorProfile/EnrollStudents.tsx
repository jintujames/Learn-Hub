import React from 'react'

function EnrollStudents() {
  return (
    <div>
      <>
  {/* component */}
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
        <tr className="bg-white border-b-2 border-gray-200">
          <td>
            <span className="text-center ml-16 font-semibold">1</span>
          </td>
          <td className="px-18 py-2">
            <span className="text-center ml-16">john doe</span>
          </td>
          <td className="px-16 py-2">
            <span>john@gmail.com</span>
          </td>
          <td className="px-16 py-2">
            <span>6756767898</span>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</>

    </div>
  )
}

export default EnrollStudents
