import React, { useState } from 'react';


function AdminCategory() {
  const [openModal, setOpenModal] = useState(false)
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
          <>
            <button onClick={()=> setOpenModal(true)}
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay="#hs-focus-management-modal" 
            >
              Open modal
            </button>
            {openModal && 
            <div
            id="hs-focus-management-modal"
            className="hs-overlay z-50 hidden w-full h-full fixed top-0 start-0 overflow-x-hidden overflow-y-auto pointer-events-none"
          >
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
              <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                <div className="flex justify-between items-center py-3 px-4 border-b">
                  <h3 className="font-bold text-gray-800">
                    Modal title
                  </h3>
                  <button
                    type="button"
                    className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    data-hs-overlay="#hs-focus-management-modal"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <label
                    htmlFor="input-label"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="input-label"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="you@site.com"
                    // autoFocus=""
                  />
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    data-hs-overlay="#hs-focus-management-modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
            }
          </>
        </div>
      </div>
    </>
  );
}

export default AdminCategory;
