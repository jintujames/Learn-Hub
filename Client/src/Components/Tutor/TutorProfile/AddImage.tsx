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
              <div x-data="{photoName: null, photoPreview: null}" className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
            {/* Photo File Input */}
            <input
                type="file"
                id="photo"
                className="hidden"
               
            />

            <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
                Profile Photo <span className="text-red-600"> </span>
            </label>

            <div className="text-center">
                {/* Current Profile Photo */}
                <div className="mt-2" >
                    <img src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" className="w-40 h-40 m-auto rounded-full shadow" />
                </div>
                {/* New Profile Photo Preview */}
                <div className="mt-2" style={{ display: 'photoPreview' ? 'none' : '' }}>
                    <span className="block w-40 h-40 rounded-full m-auto shadow" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundImage: `url('photoPreview')` }}>
                    </span>
                </div>
                
            </div>
        </div>
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
          <button className="hover:shadow-form w-full rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">
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
