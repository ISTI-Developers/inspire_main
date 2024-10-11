import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePrograms from "../../../Context/ProgramsContext";
function OurPrograms() {
  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const { retrievePrograms } = usePrograms();
  const [programs, setPrograms] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const response = await retrievePrograms();
      setPrograms(response.splice(0, 3));
    };
    setup();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center lg:flex-row gap-2 w-full max-w-[70%] mx-auto lg:gap-8">
        <div className="w-full flex items-center justify-center gap-2 font-bold text-2xl lg:text-6xl xl:text-7xl lg:flex-col lg:items-end lg:max-w-[30%]">
          <span className="text-[#DF0000] text-3xl lg:text-7xl">OUR</span>
          <span className="bg-[#DF0000] text-white p-2 px-4">PROGRAMS</span>
        </div>
        <div className="w-full xl:max-w-1/2 flex flex-col gap-6 items-center lg:flex-row lg:max-w-[70%]">
          {programs &&
            programs.map((program) => {
              const length = program.overview.length;
              return (
                <div
                  key={program.program_id}
                  className="group relative shadow-xl rounded-xl overflow-hidden w-full max-w-[450px] transition-all lg:max-w-[600px] hover:z-[3] hover:-translate-y-2 hover:scale-110"
                >
                  <img src={`${host}${program.image}`} />
                  <div className="min-h-[120px] p-4 bg-white w-full">
                    <h5 className="text-sm xl:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {program.title}
                      <p className="font-normal text-base">
                        by {program.facilitator}
                      </p>
                    </h5>
                    <Link
                      to={`/programs/${program.program_id}`}
                      className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10"
                    >
                      <span className="mr-2 hover:underline">Read more</span>
                      <FaArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default OurPrograms;
