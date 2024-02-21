import React from 'react'

function AddCourse() {
  return (
    <div>
      <>
    
  {/* component */}
  <div className="p-2 ml-2.5 w-[590px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
  <div className="sm:w-8/12 pl-0 p-3">
    <div className="space-y-2">
      <form>
        <div className="mb-2">
          <label
            htmlFor="postContent"
            className="block text-gray-700 text-m font-bold mb-2"
          >
            Section Title
          </label>
          <textarea
            id="postContent"
            name="postContent"
            className="w-full border-2 rounded-md px-1 py-0.5 leading-3 transition duration-150 ease-in-out sm:text-sm sm:leading-4 resize-none focus:outline-none focus:border-blue-500"
            placeholder="Add lesson title"
            defaultValue={""}
          />
        </div>
        
        <div className="mb-4">
          <div className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
            <input
              type="file"
              id="fileAttachment"
              name="fileAttachment"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="flex items-center cursor-pointer focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="ml-2 text-sm text-gray-600">Add a file</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
          >
            {" "}
            Add Section{" "}
           
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

</>

    </div>
  )
}

export default AddCourse
