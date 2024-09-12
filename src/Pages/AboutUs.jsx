import iet from "../assets/Train/iet.png";
import workshop from "../assets/Train/workshop.png";
import inhouse from "../assets/Train/inhouse.png";
import keynote from "../assets/Train/keynote.png";

const AboutUs = () => {
  return (
    <>
      <div className="flex justify-center items-center p-8 md:px-16 md:py-20 mb-5 mt-10"
      style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}>
        <div className="w-full min-h-[8vh] max-w-[10rem] md:py-3 md:max-w-[16rem] lg:max-w-[23rem] flex text-white bg-black lg:py-6 lg:min-h-[15vh]">
          <span className="w-full mt-3 ml-6 font-bold text-4xl md:text-6xl md:mb-3 lg:text-7xl xl:text-8xl lg:mt-1 lg:ml-5">
            ABOUT
          </span>
        </div>
        <div className="w-full min-h-[8vh] max-w-[5rem] md:py-3 md:max-w-[8rem] lg:max-w-[11rem] flex text-white bg-[#DF0000] lg:py-6 lg:px-5 lg:min-h-[15vh]">
          <span className="w-full mt-3 ml-4 font-bold text-4xl md:text-6xl md:mb-3 lg:text-7xl xl:text-8xl lg:mt-1 lg:ml-1">
            US
          </span>
        </div>
      </div>
      <section className=" gap-2 p-10 flex flex-col text-justify md:ml-4 lg:gap-12 lg:flex-row max-w-7xl mx-auto text- xl:mx-auto xl:max-w-[100rem]">
        <div className="flex w-full text-2xl lg:w-1/3 font-black lg:font-bold tracking-wide lg:text-7xl gap-1 lg:gap-3 lg:flex-col lg:justify-center items-end xl:w-[22rem]">
          <span>OUR</span>
          <span>STORY</span>
        </div>
        <div className="w-full flex flex-col gap-4 lg:w-2/3">
          <span>
            We are a company filled with the passion to inspire personal,
            professional and social excellence through our learning
            interventions such as conferences, speaking engagements, workshops,
            executive coaching, consultancy services, and other channels that
            promote competency development.
          </span>
          <span>
            Inspire is a member of United Neon Media Group. UNMG is an
            out-of-home advertising company with more than 400 sites across the
            philippines and more that 80 years of experience. It has always been
            intentional in positively influencing its stakeholder as it upholds
            its mission in Making Lives Meaningful.
          </span>
          <span>
            Thus, having Inspire Leadership Consultancy Inc. further its mission
            to proactively develop leaders of Character and Competence.
          </span>
        </div>
      </section>
      <hr className="mt-5 border-gray-400 w-full max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
      <section className=" gap-2 p-10 flex flex-col max-w-7xl  mx-auto text-justify md:ml-4 lg:gap-12 lg:flex-row-reverse lg:px- xl:mx-auto xl:max-w-[100rem] xl:px-24">
        <div className="flex text-[#DF0000] w-full text-2xl lg:w-[23rem] font-black lg:mr-28 lg:font-bold tracking-wide lg:text-7xl gap-1 lg:gap-3 lg:flex-col lg:justify-center items-start">
          <span>INSPIRED</span>
          <span>BEGINNINGS</span>
        </div>
        <div className="w-full flex flex-col gap-4 lg:w-2/3">
          <span>
            We have the distinct opportunity to be the training provider of
            choice for the country’s leaders coming from the top 1000 companies
            as well as from the academe, government agencies and even the
            religious sector.{" "}
          </span>
          <span>
            In 2005, Inspire was appointed as the exclusive licensee for John
            Maxwell’s leadership program. In late 2007, Inspire was awarded the
            exclusive licensee for best-selling author and top sales
            motivational speaker Zig Ziglar’s programs.{" "}
          </span>
          <span>
            We are also one of the few training providers with distinct ROI
            model for trainings and seminars.
          </span>
        </div>
      </section>
      <div className="hidden lg:block">
        <hr className="gap-10 border-gray-400 w-full lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
      </div>
      <div className="flex flex-col lg:flex-row lg:max-w-[80rem] p-5 lg:p-0 w-full lg:mx-auto lg:min-w-[20rem]">
        <div className="flex flex-col md:ml-8 max-md:w-full lg:mt-10 lg:ml-16">
          <img
            src={iet}
            alt=""
            className="my-auto mx-auto ml-3 lg:max-w-[32rem] lg:max-h-[19rem] max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col mt-3 lg:w-[100rem] lg:mr-5 md:ml-5 md:mt-1 md:w-full xl:w-[100rem]">
          <div className="flex flex-col justify-center px-4 md:mr-3 max-md:max-w-full">
            <div className="md:mt-4 lg:mt-8 text-black text-2xl font-black lg:font-bold tracking-wide lg:text-4xl lg:gap-3 lg:justify-center items-start xl:text-6xl">
              IET FRAMEWORK
            </div>
            <div className="mt-3 text-base leading-7 text-justify text-black max-md:max-w-full">
              Every organization needs measurable results for every trainings
              that they avail of. But what is the right result? Inspire
              understands that the right result is meant to deliver and answer
              your business’s needs. <br />
              <br />
              That is why we make sure that our learning interventions will
              drive our participants to achieve the right behavioral needs. This
              will help them meet their performance needs that are necessary for
              your organization to meet its business needs. <br />
              We achieve it through IET Framework - Inspire, Equip and Transform
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-black mt-10">
        <div className="w-full mx-auto flex flex-col text-white bg-black gap-4 py-4 md:py-6 px-10 md:min-h-[10vh] lg:flex-row lg:gap-16">
          <h1 className="w-full lg:leading-normal flex justify-center lg:items-center">
            <div className="flex flex-col md:flex-row md:gap-10 gap-2">
              <div className="flex md:flex-col gap-2 text-xl justify-center lg:gap-3 md:text-2xl lg:text-4xl text-white md:items-end font-bold">
                OUR <span className="md:block">MISSION</span>{" "}
                <span className="hidden">MISSION</span>{" "}
                {/*<span className="flex text-[#DF0000] gap-2">speaker <span className="text-white">for <span className="lg:hidden">your</span></span></span><span className="hidden lg:block">your</span> event? */}
              </div>
              <div className="flex flex-col lg:gap-2 md:text-xl lg:text-3xl md:mt-2">
                <div>
                  <span className="flex gap-2">
                    Our name is our mission: to{" "}
                    <span className="text-[#DF0000] font-semibold">
                      INSPIRE<span className="text-white font-semibold">,</span>
                    </span>
                  </span>
                </div>
                <div className="text-center md:text-start">
                  <span className="text-[#DF0000] font-semibold">EQUIP</span>
                  <span className="text-white"> and</span>
                  <span className="text-[#DF0000] font-semibold">
                    {" "}
                    TRANSFORM
                  </span>
                  <span className="text-white"> leaders.</span>
                </div>
              </div>
            </div>
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-5">
        <div className="mt-2 font-bold text-xl text-black md:text-3xl lg:text-5xl lg:mt-2 xl:text-6xl">
          <span className="text-[#DF0000]">WE TRAIN </span>YOUR WAY
        </div>
        <div className="mt-5 max-w-[22rem] text-base leading-7 text-center text-black w-[964px] md:max-w-full md:px-10 lg:px-5">
          We at Inspire also offer customizable learning interventions and
          consultancy services that cater to your individual and organizational
          needs. You have may avail of our exclusive programs or request to have
          an expert assess and recommend the best solution for your company.
        </div>
        <div className="justify-center self-stretch px-5 md:mt-10 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 lg:gap-1">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full py-5">
              <div className="shadow-md hover:shadow-2xl flex flex-col grow justify-center items-center px-4 pt-4 pb-8 w-full text-center bg-white max-md:mt-9">
                <img
                  src={workshop}
                  alt="public workshop"
                  className="max-w-full aspect-square w-[172px]"
                />
                <div className="lg:mt-2 md:mt-1 text-xl font-bold text-[#DF0000] whitespace-nowrap">
                  Public Workshops
                </div>
                <div className="self-stretch mt-3 text-base leading-4 text-black">
                  We conduct year-round workshops on different topics that range
                  from development of technical skills, to leadership and
                  personality
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="shadow-md hover:shadow-2xl flex flex-col justify-center self-stretch px-4 py-11 my-auto w-full text-base leading-6 text-center text-black bg-white max-md:mt-10">
                <img
                  src={inhouse}
                  alt="keynote"
                  className="mt-1 self-center max-w-full aspect-square w-[122px]"
                />
                <div className="flex-col text-xl font-bold text-[#DF0000] whitespace-nowrap md:mt-5">
                  In-House Workshops
                </div>
                <div className="self-stretch mt-3 text-base leading-6 text-black">
                  Our in-house workshops are designed to address specific
                  corporate challenges with measurable results.
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="shadow-md hover:shadow-2xl flex flex-col justify-center self-stretch px-4 py-11 my-auto w-full text-base leading-6 text-center text-black bg-white max-md:mt-10">
                <img
                  src={keynote}
                  alt="keynote"
                  className="mt-1 self-center max-w-full aspect-square w-[122px]"
                />
                <div className="flex-col text-xl font-bold text-[#DF0000] whitespace-nowrap md:mt-5">
                  Keynote
                </div>
                <div className="self-stretch mt-3 text-base leading-4 text-black">
                  Our extensive line-up of seasoned industry practitioners can
                  inspire and motivate big crowds during special corporate
                  occasions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
