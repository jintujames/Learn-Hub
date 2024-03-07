import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getTutorBio } from "../../../utils/config/axios.Method.Get";

interface InstructorBioDetails {
  instructorFirstName: string;
  instructorLastName: string;
  instructorEmail: string;
  phone: string;
  photo: any;

  // Add other properties as needed
}

function TutorBio() {
  const navigate = useNavigate();
  const [data, setData] = useState<InstructorBioDetails>();

  const tutorId = localStorage.getItem("tutorId");
  console.log("aaaaaaaaa", tutorId);
  console.log(typeof tutorId);

  const { tutor } = useSelector((state: any) => state.tutor);
  console.log("tuto", tutor);

  useEffect(() => {
    if (tutor) {
      console.log("tutor is here");
      navigate("/tutorProfile");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await getTutorBio(tutorId);
        console.log("tutordetails", result.data.instructorBioDetails);
        setData(result.data.instructorBioDetails);
      } catch (error) {
        console.log("Error in tutor Bio:", error);
      }
    };
    fetchData();
  }, [getTutorBio]);

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

                    <p className="text-center text-gray-600 mt-1"></p>
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
                      value={`${data?.instructorFirstName} ${data?.instructorLastName}`}
                    />
                  </div>
                  <div className="mb-2">
                    <p className="text-center text-gray-600 mt-1"></p>
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
                      value={data?.instructorEmail}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="phone"
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
                      name="phone"
                      id="phone"
                      value={data?.phone}
                    />
                  </div>
                  <div className="">
                    <div className="mb-6">
                      <label
                        className="block text-sm text-gray-600"
                        htmlFor="fileInput"
                      >
                        Choose Image
                      </label>
                      <input
                        className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                        id="fileInput"
                        name="fileInput"
                        type="file"
                        accept="image/*, video/*"
                        aria-label="fileInput"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="submit"
                      className="
                        flex-1
                        text-gray-100
                        hover:text-gray-700
                        border-gradient-200 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:bg-gradient-800 dark:border-gradient-700
                        p-3
                        transition
                        ease-in-out
                        duration-500
                        hover:bg-cyan-500"
                    >
                      Update
                    </button>
                    <div className="mx-4"></div>{" "}
                    {/* Add space between buttons */}
                    <button
                      type="submit"
                      className="
                        flex-1
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
                      Edit
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
