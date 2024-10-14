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
  const [randomExperts, setRandomExperts] = useState([]);
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
      setExpert(results.find((exp) => exp.name === id));

      // Random 4 experts
      const filteredExperts = results.filter((exp) => exp.name !== id);
      const shuffled = filteredExperts.sort(() => 0.5 - Math.random());
      const selectedExperts = shuffled.slice(0, 4);
      setRandomExperts(selectedExperts);
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
        <div className="flex flex-col gap-4">
          <div className="flex font-bold text-lg ml-4">VIEW OTHER EXPERTS</div>
          <div className="w-full max-md:max-w-full border grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 place-content-center justify-evenly gap-4 md:gap-5 xl:gap-10 p-5 md:px-12">
            {randomExperts.slice(0, 4).map((exp, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 w-full border min-h-[30rem] p-5 shadow-md hover:shadow-2xl transition-all rounded-3xl"
              >
                <img
                  src={`${host}${exp.images[0]}`}
                  alt={exp.name}
                  className="max-w-full border-gray-200 border-solid aspect-square w-[120px]"
                />
                <div className="text-xl xl:text-2xl font-bold text-center">
                  {exp.name}
                </div>
                <div className="mt-4 text-sm leading-6 indent-4 text-justify whitespace-break-spaces flex-grow">
                  {exp.description}
                </div>
                <Link
                  to={`/Experts/${exp.name}`}
                  className="flex items-center gap-2 mt-auto hover:underline transition-all hover:text-[#DF0000]"
                >
                  <span className="grow xl:text-xl">Read more</span>
                  <FaArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Expert;
