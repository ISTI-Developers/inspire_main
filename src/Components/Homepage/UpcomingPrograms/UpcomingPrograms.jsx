import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePrograms from "../../../Context/ProgramsContext";
function UpcomingPrograms() {
  let host = "http://localhost/inspiredb";
  // host = "https://new.inspireleaders.com.ph/api";
  const { retrievePrograms } = usePrograms();
  const [programs, setPrograms] = useState(null);

  const today = new Date();
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);

  useEffect(() => {
    const setup = async () => {
      const response = await retrievePrograms();
      const filteredPrograms = response.filter((program) => {
        const programDate = new Date(program.program_date);
        return programDate >= today && programDate <= twoWeeksFromNow;
      });

      if (filteredPrograms.length > 0) {
        const nearestProgram = filteredPrograms.reduce((prev, curr) => {
          const prevDate = new Date(prev.program_date);
          const currDate = new Date(curr.program_date);
          return currDate < prevDate ? curr : prev;
        });
        setPrograms(nearestProgram);
      } else {
        setPrograms(null);
      }
    };
    setup();
  }, []);

  return (
    <>
      {programs && (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-[#DF0000] font-bold text-3xl md:text-5xl lg:text-7xl">
            UPCOMING PROGRAM
          </h1>
          <div className="w-full xl:max-w-1/2 flex flex-col gap-6 items-center lg:flex-row lg:max-w-[25%]">
            <div
              key={programs.id}
              className="group relative shadow-xl rounded-xl overflow-hidden w-full max-w-[450px] transition-all lg:max-w-[600px] hover:z-[3] hover:-translate-y-2 hover:scale-110"
            >
              <img src={`${host}${programs.image}`} />
              <div className="min-h-[120px] p-4 bg-white w-full">
                <h5 className="text-sm xl:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {programs.title}
                  <p className="font-normal text-base">
                    by {programs.facilitator}
                  </p>
                  <h6>
                    {new Date(programs.program_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </h6>
                </h5>
                <Link
                  to={`/programs/${programs.program_id}`}
                  className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10"
                >
                  <span className="mr-2 hover:underline">Read more</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <hr className="mt-5 border-gray-400 w-full max-w-[1000px] mx-auto" />
        </div>
      )}
    </>
  );
}

export default UpcomingPrograms;
