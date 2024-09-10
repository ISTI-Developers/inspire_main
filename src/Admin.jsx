/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png";
import logo1 from "../src/assets/logo1.png";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineEventNote, MdOutlineSubscriptions } from "react-icons/md";
import { GiCircleClaws } from "react-icons/gi";
import { GrBlog } from "react-icons/gr";
import { FaRegRegistered, FaRegImage, FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { RiBankCardLine } from "react-icons/ri";
import classNames from "classnames";
import { BiMessageRoundedDetail } from "react-icons/bi";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    console.log("clicked");
    setSidebarOpen(false);
  };

  const SidebarLink = ({ name, icon: Icon }) => {
    return (
      <Link
        to={`/${name}`}
        className={classNames(
          "w-full flex gap-8 text-xl p-4 rounded-lg",
          activeLink === `/${name}`
            ? "bg-[#F4F9E9] text-black"
            : "text-white hover:text-[#DF0000]"
        )}
      >
        <Icon className="text-3xl" />
        <span className="capitalize">{name}</span>
      </Link>
    );
  };

  const links = [
    {
      name: "banners",
      icon: FaRegImage,
    },
    {
      name: "blogs",
      icon: GrBlog,
    },
    {
      name: "clients",
      icon: GiCircleClaws,
    },
    {
      name: "experts",
      icon: IoPeopleOutline,
    },
    {
      name: "payments",
      icon: RiBankCardLine,
    },
    {
      name: "partners",
      icon: FaUsers,
    },
    {
      name: "programs",
      icon: MdOutlineEventNote,
    },
    {
      name: "registrants",
      icon: FaRegRegistered,
    },
    {
      name: "subscriptions",
      icon: MdOutlineSubscriptions,
    },
    {
      name: "testimonials",
      icon: BiMessageRoundedDetail,
    },
  ];

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        type="button"
        className="p-4 text-xl w-fit md:hidden"
      >
        <RxHamburgerMenu />
      </button>
      <div className="fixed top-0 left-[15rem] 4xl:left-[30rem] md:left-[17rem] right-0 h-screen bg-[#F1F2F6] s:hidden md:flex -z-[1]"></div>
      <aside
        id="default-sidebar"
        className={classNames(
          "fixed bg-[#212930] dark:bg-gray-800 h-screen w-full md:max-w-[20rem] 4xl:max-w-[30rem] flex flex-col items-center pt-8 transition-transform",
          !sidebarOpen
            ? "-translate-x-full lg:translate-x-0"
            : "lg:translate-x-0"
        )}
        aria-label="Sidebar"
      >
        <button
          onClick={closeSidebar}
          aria-label="Close Sidebar"
          type="button"
          className="absolute top-2 right-2 p-4 md:hidden text-gray-600 text-xl"
        >
          <AiOutlineClose />
        </button>
        <Link to="/">
          <img src={logo} className="w-full max-w-[15rem] p-4" alt="" />
        </Link>
        <ul className="flex flex-col gap-2 items-center font-medium pt-2">
          {links.map(({ name, icon: Icon }) => {
            return <SidebarLink name={name} key={name} icon={Icon} />;
          })}
        </ul>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/");
          }}
          className="flex justify-center items-center mt-10 xl:mt-[5rem] text-base font-semibold px-3 py-2 rounded-xl hover:text-[#DF0000]  text-white"
        >
          <CiLogout className=" text-3xl mr-2" /> LOGOUT
        </button>
      </aside>
      <Link to="/">
        <img
          src={logo1}
          className="flex items-center justify-center w-full max-w-[15rem] mx-auto md:hidden mt-10 md:mt-20"
          alt=""
        />
      </Link>
    </div>
  );
}

export default Admin;
