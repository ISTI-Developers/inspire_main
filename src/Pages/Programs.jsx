import { FaArrowRight } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import Program from "./Program";
import { useEffect, useState } from "react";
import usePrograms from "../Context/ProgramsContext";
import { RegistrationProvider } from "../Context/RegistrationContext";
import Registration from "../Components/ContactUsPage/Registration";
import ILCI from "../assets/BrPrograms/ILCI.mp4";

export default function Programs() {
  const categories = [
    `INSPIRE'S LEADERSHIP SIGNATURE PROGRAMS`,
    `INSPIRE'S SIGNATURE SALES PROGRAMS`,
  ];
  let host = "http://localhost/inspiredb";
  // host = "https://new.inspireleaders.com.ph/api";
  const [programs, setPrograms] = useState(null);
  const { retrievePrograms } = usePrograms();
  useEffect(() => {
    const setup = async () => {
      const response = await retrievePrograms();
      // console.log(response);
      setPrograms(response);
    };
    setup();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          programs && (
            <>
              <div
                className="flex justify-center items-center px-16 py-20 text-8xl font-bold text-white whitespace-nowrap bg-white shadow-2xl max-md:px-5 max-md:text-4xl"
                style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="justify-center p-2.5 mt-1.5 bg-[#DF0000] max-md:max-w-full max-md:text-4xl">
                  PROGRAMS
                </div>
              </div>
              <div className="flex flex-col justify-center items-center px-20 py-14 mt-5 font-bold text-white bg-black max-md:px-5 relative">
                <div className="text-6xl text-white max-md:text-4xl">
                  POWER <span className="text-red-600">UP</span>
                </div>
                <div className="mt-8 w-[100%] max-w-[640px] max-md:w-[100%] max-md:max-w-full relative z-10 border border-white rounded-2xl overflow-hidden">
                  <video width="100%" height="360" autoPlay muted loop>
                    <source src={ILCI} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="mt-9 text-xl w-[100%] max-w-[872px] max-md:w-[100%] max-md:max-w-full">
                  The Power Up Conferences is the brainchild between the
                  partnership of Success Options Inc. and Inspire Leadership
                  Consultancy. <br />
                  <br />
                  This bi-annual conference focuses on imparting its
                  participant’s time-relative knowledge through the companies’
                  ever-widening roster of local and international speakers.
                </div>
                <Link
                  to="/contact-us"
                  className="justify-center px-4 py-4 mt-9 text-sm bg-red-600 rounded-[30px]"
                >
                  LEARN MORE
                </Link>
              </div>
              {categories.map((cat, ind) => {
                const categoryPrograms = programs.filter(
                  (prog) => prog.category == ind + 1
                );
                return (
                  categoryPrograms.length !== 0 && (
                    <div key={ind} className="flex flex-col items-center gap-8">
                      <h5 className="text-2xl font-bold text-center text-red-600 pt-10">
                        {cat}
                      </h5>
                      <div className="flex justify-center gap-8 px-10 py-5 flex-wrap">
                        {categoryPrograms.map((prog) => {
                          return (
                            <div
                              key={prog.program_id}
                              className="flex flex-col text-xl gap-4 w-full max-w-96 hover:scale-105 hover:shadow-xl hover:-translate-y-5 transition-all duration-300 p-4 bg-white shadow-md rounded-xl"
                            >
                              <img
                                src={`${host}${prog.image}`}
                                alt={prog.title}
                                className="rounded-lg"
                              />
                              <div>
                                <h4 className="font-bold">{prog.title}</h4>
                                <h6 className="text-base">
                                  by {prog.facilitator}
                                </h6>
                              </div>
                              <a
                                href={`/programs/${prog.program_id}`}
                                className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10"
                              >
                                <span className="mr-2 hover:underline">
                                  Read more
                                </span>
                                <FaArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                );
              })}
            </>
          )
        }
      />
      <Route path="/:id" element={<Program />} />
      <Route
        path="/:id/register"
        element={
          <RegistrationProvider>
            <Registration />
          </RegistrationProvider>
        }
      />
    </Routes>
  );
}
