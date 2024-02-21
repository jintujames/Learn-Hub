import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function TutorBio() {
  const navigate = useNavigate();
  const { tutor } = useSelector((state: any) => state.tutor);

  useEffect(() => {
    if (tutor) {
      console.log("tutor is here");
      navigate("/tutorProfile");
    }
  }, []);

  return (
    <>
      <section
        className="py-10 px-2 lg:px-6 overflow-hidden relative z-2"
        data-aos="fade-up"
        id="contact"
      >
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center text-slate-900 dark:text-gray-200 lg:justify-between -mx-2">
            <div
              className="w-full lg:w-full xl:w-full px-4"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={2000}
            >
              <div className="bg-gray-100 dark:bg-slate-800 relative rounded-lg p-8 sm:p-12 shadow-lg">
                <form>
                  <div className="mb-2">
                    <img
                      className="w-25 h-28 rounded-full mx-auto"
                      src="https://picsum.photos/200"
                      alt="Profile picture"
                    />
                    <h2 className="text-center text-2xl font-semibold mt-3">
                      John Doe
                    </h2>
                    <p className="text-center text-gray-600 mt-1">
                      Software Engineer
                    </p>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className=" w-full
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
                  

                  <div>
                    <button
                      type="submit"
                      className="
                              w-full
                              text-gray-100
                              hover:text-gray-700
                              border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700
                              p-3
                              transition
                              ease-in-out
                              duration-500
                              hover:bg-cyan-500
                              "
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TutorBio;
