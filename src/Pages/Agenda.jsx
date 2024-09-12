import React from "react";
import { Link } from "react-router-dom";

function TrainingAgendaItem({ title, items }) {
  return (
    <>
      <div className="mt-7">{title}</div>
      <ul className="mt-2.5 list-disc pl-5">
        {items.map((item, index) => (
          <li key={index} className="font-normal">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function Agenda() {
  return (
    <div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 py-10 lg:ml-[15rem]">
        <aside className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 font-bold max-md:mt-10 max-sm:-mt-5">
            <h2 className="text-xl text-red-600">TRAINING AGENDA</h2>
            <div className="flex flex-col items-start pl-10 mt-2.5 text-base text-black max-md:pl-5">
              {trainingAgendaItems.map((item, index) => (
                <TrainingAgendaItem
                  key={index}
                  title={item.title}
                  items={item.items}
                />
              ))}
            </div>
          </div>
        </aside>
        <div className="bg-gray-500 text-white font-bold py-2 px-0.5 max-sm:hidden rounded"></div>
        <article className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 pt-7 pb-6 text-sm text-black max-md:mt-10 max-md:max-w-full">
            <h3 className="font-bold max-md:max-w-full max-sm:-mt-10 ">What's New?</h3>
            <p className="mt-2.5 text-base leading-5 text-justify max-md:max-w-full">
              The Inspire blended learning program.
              <br />
              It is a way of teaching that combines online digital media with
              in-person <br />
              instruction to create an overall more effective and customized
              learning experience.
            </p>
            <h4 className="mt-5 font-bold max-md:max-w-full">
              The two components:
            </h4>
            <li className="mt-3.5 max-md:max-w-full">Mobile Platform:</li>
            <p className="mt-3 text-base leading-5 text-justify max-md:max-w-full">
              Learning sessions are accessed through a mobile app wherein you{" "}
              <br /> do certain tasks prior to your virtual session.
              Participants can learn at <br />
              their own pace, anytime, anywhere.
            </p>
            <li className="mt-4 max-md:max-w-full">
              Virtual Learning Sessions:
            </li>
            <p className="mt-2.5 text-base leading-5 text-justify max-md:max-w-full">
              These are live instructor-led sessions delivered through zoom{" "}
              <br />
              designed to simulate a class learning experience. These sessions{" "}
              <br />
              follow specific schedules that will be given to you upon
              registration.
            </p>
            <h4 className="mt-6 font-bold max-md:max-w-full">
              What Participants Will Receive In This Program:
            </h4>
            <p className="mt-2.5 text-base max-md:max-w-full">
              7 sessions on a mobile platform + 2 virtual learning sessions
            </p>
          </div>
        </article>
      </div>
      <div className="flex flex-col justify-center items-center px-20 py-14 mb-2 mt-5 font-bold text-white bg-black max-md:px-5 relative">
        <div className="text-3xl text-white max-md:text-4xl max-sm:text-xl max-m:text-lg max-lg:text-4xl">
          Hear What Past Participants Have to Say:
        </div>
        <div className="mt-8 w-[100%] max-w-[640px] max-md:w-[100%] max-md:max-w-full relative z-10 border border-white rounded-2xl overflow-hidden">
          <iframe
            title="YouTube Video 1"
            width="100%"
            height="360"
            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Link
          to="/contact-us"
          className="justify-center px-4 py-4 mt-9 text-sm bg-red-600 rounded-[30px]"
        >
          REGISTER NOW
        </Link>
      </div>
    </div>
  );
}

export default Agenda;
