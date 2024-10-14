import React, { useRef, useEffect, useState } from "react";
import useClient from "../../../Context/ClientContext";
import host from "../../../Context/endpoints";

const Clients = () => {
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { retrieveClients } = useClient();
  const [information, setInformation] = useState(null);

  useEffect(() => {
    const container = containerRef.current;

    const scrollRight = () => {
      const nextIndex =
        (currentPage + 1) % Math.ceil(information && information.length / 20);
      setCurrentPage(nextIndex);
      container.scrollBy({
        left: container.clientWidth,
        behavior: "smooth",
      });
    };

    const scrollInterval = setInterval(scrollRight, 2000);

    return () => clearInterval(scrollInterval);
  }, [currentPage, information && information.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const container = containerRef.current;
    container.scrollTo({
      left: page * container.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const setup = async () => {
      const data = await retrieveClients();
      setInformation(data);
    };
    setup();
  }, []);

  return (
    information && (
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[75rem]">
          <div className="justify-center self-center p-3">
            <div className="flex text-4xl md:text-5xl md:mr-4 lg:text-6xl gap-2 md:gap-3 lg:gap-5 lg:mr-12">
              <div className="flex flex-col">
                <div className="font-bold text-right text-red-600 max-md:text-center">
                  OUR
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-black max-md:text-center  max-md:text-4xl">
                  CLIENTS
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid px-14 max-md:px-5 max-md:mt-10 max-md:max-w-full gap-5 lg:grid-cols-5 xl:grid-cols-5">
            {information &&
              information
                .slice(currentPage * 20, (currentPage + 1) * 20)
                .map((img) => (
                  <div
                    key={img.brand}
                    className="relative w-full aspect-square"
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <img
                        src={`${host}${img.images}`}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                        style={{ margin: "0 1rem" }}
                      />
                    </div>
                  </div>
                ))}
          </div>
          <div className="lg:hidden">
            <div
              ref={containerRef}
              className="flex p-2.5 mb-10 space-x-5 w-full overflow-x-scroll scroll-auto scrollbar-hide"
            >
              {information &&
                information.map((img) => (
                  <img
                    key={img.brand}
                    src={`${host}${img.images}`}
                    alt=""
                    className="max-w-full border-gray-200 border-solid aspect-square w-full h-[126px] object-contain"
                    style={{ margin: "0 1rem" }}
                  />
                ))}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            {Array.from({ length: Math.ceil(information.length / 20) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`mx-2 px-3 py-1 rounded-full focus:outline-none -mt-10 mb-5 hidden ${
                    currentPage === index ? "bg-gray-300" : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Clients;
