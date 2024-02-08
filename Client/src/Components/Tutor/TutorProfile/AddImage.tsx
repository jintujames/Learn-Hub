import React from 'react'

function AddImage() {
  return (
    <>
  {/* component */}
  <div className="flex items-center justify-center p-12">
    {/* Author: FormBold Team */}
    {/* Learn More: https://formbold.com */}
    <div className="mx-auto w-full max-w-[550px] bg-white">
      <form
        className="py-6 px-9"
        action="https://formbold.com/s/FORM_ID"
        method="POST"
      >
        <div className="mb-5">
          

        </div>
        <div className="mb-6 pt-4">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">
            Upload Image
          </label>
          <div className="mb-8">
            <input type="file" name="file" id="file" className="sr-only" />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop files here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>
          
          
        </div>
        <div>
          <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Upload
          </button>
        </div>
      </form>
    </div>
  </div>
</>

  )
}

export default AddImage
