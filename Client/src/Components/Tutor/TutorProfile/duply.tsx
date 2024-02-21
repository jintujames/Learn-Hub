import React from "react";

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
                    Course Title
                  </label>
                  <textarea
                    id="postContent"
                    name="postContent"
                    className="w-full border-2 rounded-md px-1 py-0.5 leading-3 transition duration-150 ease-in-out sm:text-sm sm:leading-4 resize-none focus:outline-none focus:border-blue-500"
                    placeholder="Add title"
                    defaultValue={""}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="postContent"
                    className="block text-gray-700 text-m font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="postContent"
                    name="postContent"
                    className="w-full border-2 rounded-md px-6 py-12 leading-3 transition duration-150 ease-in-out sm:text-sm sm:leading-4 resize-none focus:outline-none focus:border-blue-500"
                    placeholder="Add description"
                    defaultValue={""}
                  />
                </div>

                <div className="mb-2">
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
                  />
                  {/* This is an example component */}
                  <div className="max-w-2xl mx-auto">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Category
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Choose category</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
                  />
                  {/* This is an example component */}
                  <div className="max-w-2xl mx-auto">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Difficulty Level
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Choose Level</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>

                  <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                    <label
                      htmlFor="upload"
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 fill-white stroke-indigo-500"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600 font-medium">
                        Upload Thumbnail
                      </span>
                    </label>
                    <input id="upload" type="file" className="hidden" />
                  </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="w-44 mt-2 border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700 border-2 rounded-md py-1.5 text-white"
                  >
                    {" "}
                    Add Lesson{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AddCourse;
