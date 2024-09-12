import pillar from "../assets/BrPrograms/pillar.webp";
import { FaArrowRight } from "react-icons/fa";

const ExtPillars = () => {
  return (
    <>
      <div className="flex flex-col items-center px-5">
        <div className="mt-7 w-full max-w-[1033px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[43%] max-md:ml-0 max-md:w-full">
              <img
                src={pillar}
                alt=""
                className="w-full aspect-[1.49] max-md:mt-10 max-md:max-w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-sm text-black max-md:mt-10 max-md:max-w-full">
                <div className="text-3xl max-md:max-w-full font-bold">
                  The Uplift Pillar
                </div>
                <div className="mt-2.5 leading-5 max-md:max-w-full">
                  One might be able to do the things they’re supposed to, but
                  leaders are motivated to a higher purpose, or having the
                  self-motivation to keep going when their willpower is
                  depleted.
                </div>
                <div className="mt-5 text-base text-red-600 max-md:max-w-full font-bold">
                  Expectations:
                </div>
                <div className="mt-2.5 leading-5 max-md:max-w-full">
                  The attendees will know that attitude is everything inside and
                  outside work that we need to protect our assets.
                </div>
                <div className="self-start mt-5 text-base text-red-600 font-bold">
                  Topics in the material:
                </div>
                <div className="mt-2.5 leading-5 pl-5">
                  <ul className="list-disc">
                    <li>Currencies of the future</li>
                    <li>How is your attitude?</li>
                    <li>Protect your assets</li>
                    <li>Management by imagination</li>
                    <li>The dynamics of power</li>
                    <li>The DNA of winners</li>
                  </ul>
                </div>
                <button className="justify-center self-start px-4 py-4 mt-5 text-white bg-red-600 rounded-[30px]">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-400 w-full max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
        <div className="mt-12 ml-9 text-xl font-bold text-justify text-red-600 max-md:mt-10 max-md:max-w-full">
          Other Programs for Leadership That Matters: Four Pillars
        </div>
        <div className="flex justify-center gap-5 px-10 py-5 max-md:flex-col max-md:gap-0">
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
                <div className="mt-7 font-bold">The Opportunity Pillar</div>
                <div className="mt-2 text-sm leading-5">
                  Every one wants to climb the corporate ladder. The difference
                  is the attitude and willingness of a person o do more than
                  just fulfill a basic job description. That’s a leader.
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
                  Leadership qualities are in high demand for good reason — they
                  can drive organizational success and elevate employee morale.
                  Leaders are expected to lead.
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
    </>
  );
}

export default ExtPillars;