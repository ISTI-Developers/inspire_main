import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { Carousel } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";
import useExperts from "../Context/ExpertsContext";
import host from "../Context/endpoints";

function Expert() {
  const { id } = useParams();
  const { retrieveExperts } = useExperts();
  const [experts, setExperts] = useState([]);
  const [expert, setExpert] = useState();
  useEffect(() => {
    const setup = async () => {
      let results = await retrieveExperts();
      results = results.map((result) => {
        return {
          ...result,
          images: JSON.parse(result.images),
        };
      });
      setExperts(results.filter((exp) => exp.name !== id));
      setExpert(results.find((exp) => exp.name === id));
    };
    setup();
  }, [id]);
  return (
    expert && (
      <div className="flex flex-col justify-between h-full mt-8">
        <div className="w-full lg:max-w-7xl mx-auto">
          <Link
            to={`/Experts`}
            className="flex items-center w-fit ml-5 lg:ml-10"
          >
            <IoArrowBackCircle className="text-4xl" />
            <div className="font-semibold">Back</div>
          </Link>
          <div className="lg:block">
            <h1 className="flex justify-center font-bold text-[#DF0000] text-2xl lg:text-7xl ">
              {expert.name}
            </h1>
            <div className="flex justify-center mt-10 mx-auto p-5 flex-col lg:flex-row">
              <div className="w-full lg:w-[47%] mb-5 lg:mb-0 lg:mr-5">
                <img
                  src={`${host}${expert.images[1]}`}
                  alt=""
                  className="ml-auto w-full max-w-[20rem] rounded-lg"
                />
              </div>
              <div className="flex w-full lg:w-[53%] ml-5 text-justify lg:mr-10">
                <span className="whitespace-break-spaces indent-8">
                  {expert.biography}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex font-bold text-lg ml-4">VIEW OTHER EXPERTS</div>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel
              slide={false}
              theme={{
                indicators: {
                  active: {
                    off: "bg-gray-300 hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-800",
                    on: "bg-gray-600 dark:bg-gray-400",
                  },
                  base: "h-3 w-3 rounded-full",
                  wrapper:
                    "absolute -bottom-7 left-1/2 flex -translate-x-1/2 space-x-3 lg:hidden",
                },
              }}
            >
              {experts.map((exp, index) => (
                <div
                  key={index}
                  className="flex h-full items-center justify-center dark:text-white"
                >
                  <div className="px-3 py-10 mx-auto w-full border grid md:grid-cols-2 lg:grid-cols-4 place-content-center gap-4">
                    {experts
                      .slice(index * 4, (index + 1) * 4)
                      .map((exp, idx) => {
                        return (
                          <div
                            key={idx}
                            className="flex shadow-sm hover:shadow-2xl dark-shadow transition-all rounded-lg"
                          >
                            <div className="flex flex-col items-center px-5 py-8 gap-4  text-black bg-white ">
                              {/* Use image from newImages array */}
                              <img
                                src={`${host}${exp.images[0]}`}
                                alt=""
                                className="max-w-full border-gray-200 border-solid aspect-square w-[120px]"
                              />
                              <div className="text-xl font-bold text-center whitespace-nowrap">
                                {exp.name}
                              </div>
                              <div className="self-stretch mt-2 text-sm leading-5 text-center">
                                {exp.description}
                              </div>
                              <Link
                                to={`/Experts/${exp.name}`}
                                className="flex items-center mt-auto"
                              >
                                <span className="grow">Read more</span>
                                <FaArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    )
  );
}

export default Expert;
