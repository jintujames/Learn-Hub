import React from 'react'

function AddCategory() {
  return (
    <>
      {/* component */}
      <div className="flex h-screen items-center justify-center">
      <div className="flex max-w-2xl flex-col rounded-sm border bg-gray-100 px-10 text-center shadow-lg">
          <h1 className="mb-7 mt-6 text-3xl">Add Category</h1>
          <div className="mb-7 flex space-x-3 border">
            <div className="">
              <input
                id="finput"
                type="text"
                className="mb- p-2 border bg-gray-200"
              />
            </div>
          </div>
          <div className="mb-5">
            <button
              //   onclick="convert()"
              className="border py-2 px-8 bg-red-600 text-white shadow-2xl hover:bg-black"
              type="submit"
            >
              Add
            </button>
            <button
              //   onclick="convert()"
              className="border py-2 px-8 bg-green-600 text-white shadow-2xl hover:bg-black"
              type="submit"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategory
