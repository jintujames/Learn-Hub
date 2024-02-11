import React from 'react'

function TutorBio() {
  return (
    <>
  <section
  className="py-20 px-4 lg:px-16 overflow-hidden relative z-10"
  data-aos="fade-up"
  id="contact"
>
  <div className="container">
    
    <div className="flex flex-col lg:flex-row lg:items-center text-slate-900 dark:text-gray-200 lg:justify-between -mx-4">
      
      <div
        className="w-full lg:w-full xl:w-full px-4"
        data-aos="fade-up"
        data-aos-delay={500}
        data-aos-duration={2000}
      >
        <div className="bg-gray-100 dark:bg-slate-800 relative rounded-lg p-8 sm:p-12 shadow-lg">
          <form>
            <div className="mb-6">
              <input type="text" placeholder="Your Name" className=" w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                name="full_name"
                id="full_name"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Your Email"
                className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                name="email"
                id="email"
              />
            </div>
            <div className="mb-6">
              <input
                inputMode="numeric"
                placeholder="Your Phone"
                className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                name="phone_number"
                id="phone_number"
              />
            </div>
            <div className="mb-6">
              <input
                inputMode="text"
                placeholder="Headline"
                className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                name="headline"
                id="headline"
              />
            </div>
            <div className="mb-6">
              <input
                inputMode="text"
                placeholder="Bio"
                className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                name="bio"
                id="bio"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="
                              w-full
                              text-gray-100
                              hover:text-gray-700
                              bg-cyan-300
                              rounded
                              border border-primary
                              dark:border-slate-600
                              p-3
                              transition
                              ease-in-out
                              duration-500
                              hover:bg-cyan-500
                              "
              >
                Send Message
              </button>
            </div>
          </form>
          <div>
           
           
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>


  )
}

export default TutorBio
