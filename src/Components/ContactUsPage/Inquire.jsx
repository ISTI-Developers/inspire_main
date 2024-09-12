import React from "react";

function Inquire() {
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg border max-w-lg w-full">
        <div className="text-center text-red-600 text-2xl font-bold mb-6">INQUIRE</div>
        <div class="justify-center pr-12 pl-2 mt-3 text-center text-red-600 whitespace-nowrap rounded-xl max-md:pr-5 max-md:max-w-full">
          <div class="justify-center py-2 md:px-2 mx-auto mt-3 text-center text-red-600 whitespace-nowrap rounded-xl border border-solid border-neutral-400 max-md:px-5 max-md:max-w-full flex items-center">
            <input
              type="text"
              placeholder="Name"
              name="name"
              class="text-black border-none outline-none flex-grow mr-2"
              required
            />
            <span class="text-red-600">*</span>
          </div>
          <div class="justify-center py-2 md:px-2 mx-auto mt-3 text-center text-red-600 whitespace-nowrap rounded-xl border border-solid border-neutral-400 max-md:px-5 max-md:max-w-full flex items-center">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              class="text-black border-none outline-none flex-grow mr-2"
              required
            />
            <span class="text-red-600">*</span>
          </div>
          <div class="justify-center py-2 md:px-2 mx-auto mt-3 text-center text-red-600 whitespace-nowrap rounded-xl border border-solid border-neutral-400 max-md:px-5 max-md:max-w-full flex items-center">
              <select
                id="typeProgram"
                name="typeProgram"
                required
                class="text-black text-opacity-60 border-none outline-none flex-grow mr-2"
              >
                <option value="" disabled selected hidden>
                  Type of Program
                </option>
                <option value="18-25"></option>
                <option value="26-35"></option>
                <option value="36-45"></option>
                <option value="46+"></option>
              </select>
              <span class="text-red-600">*</span>
            </div>
            <div class="justify-center py-2 md:px-2 mx-auto mt-3 text-center text-red-600 whitespace-nowrap rounded-xl border border-solid border-neutral-400 max-md:px-5 max-md:max-w-full flex items-center">
              <select
                id="aboutProgram"
               
                name="aboutProgram"
                required
                class="text-black text-opacity-60 border-none outline-none flex-grow mr-2 max-sm:text-xs"
              >
                <option value="" disabled selected hidden>
                  How did you know about our programs?
                </option>
                <option value="18-25"></option>
                <option value="26-35"></option>
                <option value="36-45"></option>
                <option value="46+"></option>
              </select>
              <span class="text-red-600">*</span>
            </div>
            <div className="flex flex-col gap-1 mt-5 border border-solid border-gray-500 rounded-lg">
            <label htmlFor="message" className="font-semibold"></label>
            <textarea id="message" name="message" placeholder="Message" rows="4" className="input-field" required></textarea>
          </div>
          <button className="flex justify-center items-center px-5 py-2.5 mt-6 max-w-full text-base font-bold text-white whitespace-nowrap bg-red-600 rounded-xl max-md:px-5 max-md:max-w-full">
                SUBMIT
              </button>
      </div>
    </div>
    </div>
    </>
  );
}

export default Inquire;
