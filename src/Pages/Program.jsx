/* eslint-disable react/prop-types */
import { FaCalendarDay, FaRegClock, FaUsers } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePrograms from "../Context/ProgramsContext";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { Banner } from "flowbite-react";
import host from "../Context/endpoints";

function CountdownItem({ value, label }) {
  return (
    <div className="flex flex-col justify-center items-center p-5 rounded-xl border border-white border-solid w-full">
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-base">{label}</div>
    </div>
  );
}
function Program() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const { retrieveProgram } = usePrograms();
  const [difference, setDifference] = useState(0);

  const Countdown = ({ program }) => {
    const { program_date, time_start } = program;

    const date = new Date(program_date);
    const [startHour, startMin] = format(new Date(time_start), "HH:mm").split(
      ":"
    );
    date.setHours(startHour);
    date.setMinutes(startMin);
    const dateDiff = differenceInDays(new Date(date), new Date());
    const hourDiff = differenceInHours(new Date(date), new Date()) % 24;
    const minDiff = differenceInMinutes(new Date(date), new Date()) % 60;

    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center">
          <CountdownItem value={dateDiff} label="DAYS" />
        </div>
        <div className="flex items-center justify-center">
          <CountdownItem value={hourDiff} label="HOURS" />
        </div>
        <div className="flex items-center justify-center">
          <CountdownItem value={minDiff} label="MINUTES" />
        </div>
      </div>
    );
  };
  useEffect(() => {
    const setup = async () => {
      const result = await retrieveProgram(id);
      setProgram(result);
      console.log(result);
      setDifference(
        differenceInDays(new Date(result.date_reg_limit), new Date())
      );
    };
    setup();
  }, []);
  function Section() {
    return (
      <>
        <p className="font-bold">Program Countdown</p>
        <Countdown program={program} />
        {difference < 0 ? (
          <p
            to={`/programs/${id}/register`}
            className="bg-[#654242] brightness-75 p-4 rounded-full text-center font-bold cursor-not-allowed select-none"
          >
            REGISTER
          </p>
        ) : (
          <Link
            to={`/programs/${id}/register`}
            className="bg-[#DF0000] p-4 rounded-full text-center font-bold"
          >
            REGISTER
          </Link>
        )}
      </>
    );
  }
  return (
    program && (
      <>
        {difference <= 7 && difference >= 0 && (
          <div className="bg-black">
            <Banner>
              <div className="bg-[#DF0000] animate-pulse brightness-110 text-white p-1.5 font-semibold text-center">
                Hurry up now! Registration ends
                {difference === 0 ? ` today!` : ` in ${difference} days!`}
                {/* //alternative 
                    ` on ${format(
                      new Date(program.date_reg_limit),
                      "MMMM dd, yyyy"
                    )}!` */}
              </div>
            </Banner>
          </div>
        )}
        <section className="grid items-center justify-center gap-6 bg-black p-8 lg:grid-cols-3 lg:items-start xl:grid-cols-2 xl:gap-12 xl:px-[20rem]">
          <img
            src={`${host}${program.image}`}
            alt=""
            className="rounded-lg w-full lg:max-w-[500px] xl:ml-auto"
          />
          <div className="flex flex-col gap-2">
            <section className="pb-2">
              <h1 className="md:text-5xl text-red-600 text-4xl font-bold">
                {program.title}
              </h1>
              <h3 className="text-white">by {program.facilitator}</h3>
            </section>
            <div className="flex gap-3.5 text-sm text-white">
              <div className="flex gap-1 items-center">
                <FaCalendarDay alt="Calendar icon" />
                <p>{format(new Date(program.program_date), "MMMM dd, yyyy")}</p>
              </div>
              <div className="flex gap-1 items-center">
                <FaRegClock alt="Clock icon" />
                <div className="my-auto">
                  {format(new Date(program.time_start), "hh:mm a")} -{" "}
                  {format(new Date(program.time_end), "hh:mm a")}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <FaUsers alt="Clock icon" />
                <div className="my-auto">
                  {program.num_reg_limit - program.parts} slots left!
                </div>
              </div>
            </div>
            <p className="leading-6 text-justify text-white indent-8">
              {program.overview}
            </p>
            <div className="hidden flex-col justify-center text-white gap-4 xl:flex">
              <Section />
            </div>
          </div>
          <div className="flex flex-col justify-center text-white gap-4 xl:hidden">
            <Section />
          </div>

          {/* <div className="mt-2 w-full max-w-[1006px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center font-bold max-md:mt-10">
                  <h1 className="text-5xl text-red-600 max-md:text-4xl">
                    {program.title}
                  </h1>
                  <div className="flex gap-3.5 text-sm text-white">
                    <div className="flex gap-0.5">
                      <FaCalendarDay
                        alt="Calendar icon"
                      
                      />
                      <div className="my-auto">
                        {format(
                          new Date(program.program_date),
                          "MMMM dd, yyyy"
                        )}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      <FaRegClock
                        alt="Clock icon"
                      
                      />
                      <div className="my-auto">
                        {format(new Date(program.time_start), "hh:mm a")} -{" "}
                        {format(new Date(program.time_end), "hh:mm a")}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-7 text-base leading-6 text-justify text-white indent-8">
                  {program.overview}
                </p>
              </div>
             
            </div>
          </div> */}
        </section>
        <div
          className="max-w-[90%] lg:max-w-[70%] xl:max-w-[55%] mx-auto p-4"
          dangerouslySetInnerHTML={{ __html: JSON.parse(program.description) }}
        ></div>
        {/* <Agenda /> */}
      </>
    )
  );
}

export default Program;
