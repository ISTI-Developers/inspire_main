import pillar from "../assets/BrPrograms/pillar.webp";
import pillars from "../assets/BrPrograms/pillars.webp";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa"; 
import { Link } from "react-router-dom";



const Pillars = () => {
  return (
    <>
      <div className="flex items-center ml-5">
      <Link to="/programs" className="flex items-center text-xl font-semibold text-black">
          <IoArrowBackCircle className="text-3xl mr-2" />
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold text-red-600">BRANDED PROGRAM</div>
        <img
          src={pillars}
          alt=""
          className="mt-8 w-full max-w-screen-lg rounded-2xl border-black border-solid aspect-[2.5] border-[6px] max-md:max-w-full"
        />
        <div className="mt-11 text-3xl font-bold text-black max-md:mt-10 max-md:max-w-full">
          Leadership That Matters: Four Pillars
        </div>
        <div className="mt-4 text-base text-justify text-black w-[845px] max-md:max-w-full">
          Based on Francis Kong’s No.1 best-selling non-fiction book, this
          series focuses on transforming high-potential individuals to
          high-performance leaders through the four pillars of great leadership
        </div>
        <Link to="/registration" className="justify-center px-5 py-4 mt-7 text-lg font-bold text-white bg-red-600 rounded-[20px]">
          REGISTER
        </Link>
        <hr className="mt-10 border-gray-400 w-full max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
        <div className="self-stretch px-5 w-full max-md:max-w-full">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="self-stretch mt-24 w-full text-xl font-bold text-justify text-red-600 max-md:mt-10 max-md:max-w-full">
                Programs for Leadership That Matters: Four Pillars
              </div>
            </div>
          </div>
          <div className="flex gap-5 px-10 py-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="card-container hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col grow px-5 pt-6 pb-14 mx-auto w-full text-base text-black bg-white shadow hover:shadow-lg hover:black rounded-2xl max-md:px-5 max-md:mt-6">
                  <img src={pillar} alt="" className="w-full aspect-[1.16] rounded-lg" />
                  <div className="mt-7 font-bold">The Foundation Pillar</div>
                  <div className="mt-2 text-sm leading-4">
                    Leaders should manage their emotions effectively in the
                    workplace. Every reaction–positive or negative–will have
                    consequences for all those who are under them and effect the
                    overall success of the company.
                  </div>
                  <Link to="/SubBranded" className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10">
        <span className="mr-2 hover:underline">Read more</span>
        <FaArrowRight className="w-4 h-4" />
      </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="card-container hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col grow px-5 pt-6 pb-14 mx-auto w-full text-base text-black bg-white shadow hover:shadow-lg hover:black rounded-2xl max-md:px-5 max-md:mt-6">
                  <img src={pillar} alt="" className="w-full aspect-[1.16] rounded-lg" />
                  <div className="mt-7 font-bold">The Opportunity Pillar</div>
                  <div className="mt-2 text-sm leading-5">
                    Every one wants to climb the corporate ladder. The
                    difference is the attitude and willingness of a person o do
                    more than just fulfill a basic job description. That’s a
                    leader.
                  </div>
                  <button className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10">
        <span className="mr-2 hover:underline">Read more</span>
        <FaArrowRight className="w-4 h-4" />
      </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="card-container hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col grow px-5 pt-6 pb-14 mx-auto w-full text-base text-black bg-white shadow hover:shadow-lg hover:black rounded-2xl max-md:px-5 max-md:mt-6">
                  <img src={pillar} alt="" className="w-full aspect-[1.16] rounded-lg" />
                  <div className="mt-7 font-bold">The Uplift Pillar</div>
                  <div className="mt-2 text-sm leading-5">
                    One might be able to do the things they’re supposed to, but
                    leaders are motivated to a higher purpose, or having the
                    self-motivation to keep going when their willpower is
                    depleted.
                  </div>
                  <button className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10">
        <span className="mr-2 hover:underline">Read more</span>
        <FaArrowRight className="w-4 h-4" />
      </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="card-container hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col grow px-5 pt-6 pb-14 mx-auto w-full text-base text-black bg-white shadow hover:shadow-lg hover:black rounded-2xl max-md:px-5 max-md:mt-6">
                  <img src={pillar} alt="" className="w-full aspect-[1.16] rounded-lg" />
                  <div className="mt-7 font-bold">The Reinvent Pillar</div>
                  <div className="mt-2 text-sm leading-5">
                    Leadership qualities are in high demand for good reason —
                    they can drive organizational success and elevate employee
                    morale. Leaders are expected to lead.
                  </div>
                  <button className="flex justify-center items-center mt-10 text-base text-black border-solid border-black max-md:mt-10">
        <span className="mr-2 hover:underline">Read more</span>
        <FaArrowRight className="w-4 h-4" />
      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pillars;
