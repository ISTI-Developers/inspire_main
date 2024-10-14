import { FaArrowRight } from "react-icons/fa";
import { Route, Routes } from "react-router";
import Expert from "../Components/Expert";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useExperts from "../Context/ExpertsContext";
import host from "../Context/endpoints";

function Experts() {
  const { retrieveExperts } = useExperts();
  const [experts, setExperts] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const response = await retrieveExperts();
      setExperts(response);
    };
    setup();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="flex justify-center items-center p-8 md:px-16 md:py-20 mt-10 text-8xl font-bold text-white whitespace-nowrap bg-white max-md:px-5 max-md:text-4xl"
                style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="justify-center px-5 py-3 mt-1.5 bg-black max-md:max-w-full md:text-6xl lg:text-7xl xl:text-8xl">
                  EXPERTS
                </div>
              </div>
              <div className="w-full max-md:max-w-full border grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-content-center justify-evenly gap-4 md:gap-5 xl:gap-10 p-5 md:px-12">
                {experts &&
                  experts.map((expert) => {
                    const images = JSON.parse(expert.images);
                    return (
                      <div
                        key={expert.expert_id}
                        className="flex flex-col items-center gap-4 w-full border min-h-[38rem] p-8 max-md:ml-0 md:min-w-full shadow-md hover:shadow-2xl lg:hover:shadow-2xl md:hover:shadow-md transition-all rounded-3xl"
                      >
                        <img
                          src={`${host}${images[0]}`}
                          className="rounded-lg max-w-full border-gray-200 border-solid aspect-square w-[12rem]"
                          alt={expert.name}
                        />
                        <p className="text-2xl xl:text-3xl font-bold text-center">
                          {expert.name}
                        </p>
                        <p className="mt-4 leading-8 text-[1.1rem] indent-8 text-justify whitespace-break-spaces">
                          {expert.description}
                        </p>
                        <Link
                          to={`/Experts/${expert.name}`}
                          className="flex items-center gap-2 mt-auto hover:underline transition-all hover:text-[#DF0000]"
                        >
                          <span className="grow xl:text-xl">Read more</span>
                          <FaArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </>
          }
        />
        <Route path="/:id" element={<Expert />} />
      </Routes>
    </>
  );
}

export default Experts;
