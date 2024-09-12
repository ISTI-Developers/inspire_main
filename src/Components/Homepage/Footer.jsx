import map from "../../assets/map.png";
import unmg from "../../assets/unmg.png";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="grid-cols-3 grid gap-5 justify-between px-[200px] pt-16 pb-8 bg-black max-md:flex-wrap max-md:px-5">
      <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-base font-bold text-white max-md:mt-10">
                <div>
                  2F HPL Building, 60 Sen. Gil Puyat Ave.,Makati City 1200
                  Philippines
                </div>
                <img
                  src={map}
                  alt="map"
                  className="mt-5 w-full aspect-[1.52]"
                />

                <div className="mt-16 text-base max-md:mt-10">
                  Inspire Leadership Consultancy, Inc. is a member of:
                </div>
                <img
                  src={unmg}
                  alt="unmg logo"
                  className="self-center mt-3.5 aspect-[4.55] w-[168px]"
                />
                <div className="text-white">INSPIRE LEADERSHIP</div>
                <div className="text-white">CONSULTANCY, INC.</div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-center items-start max-md:mt-10 max-md:max-w-full">
                <div className="self-stretch max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base text-white max-md:mt-10">
                        <div className="font-bold text-white">CONTACT US:</div>
                        <div>
                          <button className="flex gap-3.5 justify-center items-center px-6 py-1.5 mt-3 whitespace-nowrap rounded-3xl max-md:px-5 border border-transparent transition duration-300 hover:border-white hover:bg-white hover:text-red-500">
                            <FaFacebook className="shrink-0 aspect-square w-[27px] hover:text-red-500" />
                            <div className="flex-auto my-auto">Inspire</div>
                          </button>
                          <button className="flex gap-3.5 justify-center items-center px-6 py-1.5 mt-3 whitespace-nowrap rounded-3xl max-md:px-5 border border-transparent transition duration-300 hover:border-white hover:bg-white hover:text-red-500">
                            <FaTwitter className="shrink-0 aspect-square fill-white w-[27px]" />
                            <div className="flex-auto my-auto">inspire.ph</div>
                          </button>
                          <button className="flex gap-3.5 justify-center items-center px-6 py-1.5 mt-3 whitespace-nowrap rounded-3xl max-md:px-5 border border-transparent transition duration-300 hover:border-white hover:bg-white hover:text-red-500">
                            <FaInstagram className="shrink-0 aspect-square fill-white w-[27px]" />
                            <div className="flex-auto my-auto">inspire.ph</div>
                          </button>
                          <button className="flex gap-3.5 justify-center items-center px-6 py-1.5 mt-3 whitespace-nowrap rounded-3xl max-md:px-5 border border-transparent transition duration-300 hover:border-white hover:bg-white hover:text-red-500">
                            <FaPhoneAlt className="shrink-0 aspect-square fill-white w-[27px]" />
                            <div className="flex-auto my-auto">
                              0919-074-3688
                            </div>
                          </button>
                          <button className="flex gap-3.5 justify-center items-center px-6 py-1.5 mt-3 whitespace-nowrap rounded-3xl max-md:px-5 border border-transparent transition duration-300 hover:border-white hover:bg-white hover:text-red-500">
                            <FaEnvelope className="shrink-0 aspect-square fill-white w-[27px]" />
                            <div className="flex-auto my-auto">
                              ask@inspireleaders.com.ph
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
                     
                    </div>
                  </div>
                </div>
                <div className="mt-20 text-base font-bold text-white max-md:mt-10">
                  INQUIRY:
                </div>
                <div className="mt-5 text-base text-white w-[356px]">
                  Receive full details on our in-house training, keynote
                  speakers, public seminars, and more!
                </div>
                <div className="justify-center px-4 py-4 mt-5 text-sm font-bold text-white whitespace-nowrap bg-red-600 rounded-[30px]">
                  LEARN MORE
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10 ml-[140px] border-gray-300 w-[1000px]" />
        <div className="self-center px-8 pt-7 mt-14 text-sm text-center text-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
          Copyright © 2024 by{" "}
          <span className="text-white">
            Inspire Leadership Consultancy, Inc.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
