import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function SuccessMessage() {
  return (
    <div className="flex flex-col justify-center items-center px-12 py-10 text-xl font-bold bg-white shadow-2xl max-w-[436px] rounded-[30px]">
      <FaCheckCircle   className="max-w-full aspect-square w-[100px] text-8xl text-[#008000]"
        alt="Success icon"
      />
      <h2 className="mt-5 text-[#008000]">SUCCESS!</h2>
      <p className="self-stretch mt-2.5 text-black">
        Your response has been submitted.
      </p>
      <button className="justify-center p-2.5 mt-10 text-sm text-white bg-red-600 rounded-[30px]">
        LEARN MORE
      </button>
    </div>
  );
}

export default SuccessMessage;