import React from 'react'

function AdminCategory() {
  return (
    <>
    {/* component */}
    <div className="md:px-10 py-8 w-full mr-4 flex justify-center items-center">
      {/* <div className="shadow overflow-hidden rounded border-b border-gray-200"> */}
      <table className="w-full lg:w-1/3 xl:w-1/2 bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-800 text-white">
            
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Category Name
              </th>
              
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
              
             
            </tr>
          </thead>
          <tbody className="text-gray-700">
  
            <tr>
              <td className="w-1/3 text-left py-3 px-4">
                category  
              </td>
              
              
              <td className="text-left py-3 px-4 flex space-x-4">
                <button className="px-5 py-1 bg-red-500 hover:bg-yellow-600 text-white text-sm font-medium ">
                  Edit
                </button>

                <button className="px-5 py-1 bg-green-500 hover:bg-yellow-600 text-white text-sm font-medium ">
                  Delete
                </button>
    
              </td>
              
            </tr>
          </tbody>
      </table>

      <div className="flex space-x-4">
        <button className="px-2 py-3 bg-red-500 hover:bg-yellow-600 text-white text-sm font-medium ">
          Add Category
        </button>

      </div>



      {/* </div> */}
    </div>
  </>
  )
}

export default AdminCategory
