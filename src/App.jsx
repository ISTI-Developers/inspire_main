/* eslint-disable react/jsx-key */
import {
  BrowserRouter as Rout,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Navbar, Button, Label } from "flowbite-react";
import inspirelogo from "./inspirelogo.png";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Programs from "./Pages/Programs";
import Calendar from "./Components/Calendar/Calendar";
import Experts from "./Pages/Experts";
import Blogs from "./Pages/Blogs";
import ContactUs from "./Pages/ContactUs";
import map from "./assets/map.png";
import unmg from "./assets/unmg.png";
import {
  FaEnvelope,
  FaFacebook,
  FaPhoneAlt,
  FaTwitter,
  FaArrowUp,
  FaInstagram,
  FaDotCircle,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SubscriptionProvider } from "./Context/SubscriptionContext";
import { ExpertsProvider } from "./Context/ExpertsContext";
import usePrograms, { ProgramProvider } from "./Context/ProgramsContext";
import { BlogsProvider } from "./Context/BlogsContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Rout>
      <ScrollToTop />
      <Header />
      <div className="min-h-[calc(100vh-85px)]">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/programs/*"
            element={
              <ProgramProvider>
                <Programs />
              </ProgramProvider>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProgramProvider>
                <Calendar />
              </ProgramProvider>
            }
          />

          <Route
            path="/experts/*"
            element={
              <ExpertsProvider>
                <Experts />
              </ExpertsProvider>
            }
          />
          <Route
            path="/blogs/*"
            element={
              <BlogsProvider>
                <Blogs />
              </BlogsProvider>
            }
          />

          <Route
            path="/contact-us"
            element={
              <SubscriptionProvider>
                <ContactUs />
              </SubscriptionProvider>
            }
          />
        </Routes>
      </div>
      <ProgramProvider>
        <Footer />
      </ProgramProvider>
    </Rout>
  );
}

function Header() {
  const track = useLocation();
  const links = [
    {
      title: "Home",
      link: "",
    },
    {
      title: "About Us",
      link: "about-us",
    },
    {
      title: "Programs",
      link: "programs",
    },
    {
      title: "Calendar",
      link: "calendar",
    },
    {
      title: "Experts",
      link: "experts",
    },
    {
      title: "Blogs",
      link: "blogs",
    },
    {
      title: "Contact Us",
      link: "contact-us",
    },
  ];
  return (
    <Navbar
      fluid
      theme={{
        root: {
          inner: {
            base: "mx-auto pl-3 pt-3 flex gap-4 flex-wrap items-center justify-between",
          },
        },
        collapse: {
          base: "w-full md:flex md:w-fit md:ml-auto",
        },
        link: {
          active: {
            on: "bg-[#DF0000] text-white text-xl  dark:text-white md:bg-transparent md:text-[#DF0000] md:underline",
            off: "border-b border-gray-100 text-lg mx-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-[#DF0000] md:dark:hover:bg-transparent md:dark:hover:text-white",
          },
        },
      }}
    >
      <Navbar.Brand as={Link} to={`https://new.inspireleaders.com.ph`}>
        <img
          src={inspirelogo}
          className="h-[53px] lg:h-[70px]"
          alt="Inspire Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button
          as="a"
          href="https://thefutureofwork.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:block"
          pill
          color="failure"
          theme={{
            color: {
              failure:
                "text-white text-lg bg-[#DF0000] border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
            },
          }}
        >
          THE FUTURE OF WORK
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {links.map((a, index) => {
          return (
            <Navbar.Link
              key={index}
              as={Link}
              to={`/${a.link}`}
              active={track.pathname === `/${a.link}`}
            >
              {a.title}
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
}
function Footer() {
  const socials = [
    {
      label: "Inspire Leadership Consultancy",
      icon: FaFacebook,
      link: "https://www.facebook.com/inspireph",
    },
    {
      label: "@Inspireph",
      icon: FaTwitter,
      link: "https://x.com/INSPIREph",
    },
    {
      label: "@inspireph",
      icon: FaInstagram,
      link: "https://www.facebook.com/inspireph",
    },
    {
      label: "+(63) 919 074 3688",
      icon: FaPhoneAlt,
      link: "tel:+639190743688",
    },
    {
      label: "ask@inspireleaders.com.ph",
      icon: FaEnvelope,
      link: "mailto:ask@inspireleaders.com.ph",
    },
  ];
  return (
    <>
      <footer className="relative bg-black text-white min-h-[100dvh] lg:min-h-[50dvh] p-6 lg:p-10 transition-all flex flex-col gap-2 xl:px-32">
        <div className="grid gap-8 lg:grid-cols-2 py-4 xl:grid-cols-3">
          <section className="flex flex-col gap-4 lg:row-[1/3]">
            <p className="text-white font-semibold sm:text-lg">
              2F HPL Building, 60 Sen. Gil Puyat Ave., Makati City 1200
              Philippines
            </p>
            <UNMGMap />
            <p className="lg:max-w-[30ch] pt-2">
              Inspire Leadership Consultancy, Inc. is a member of:
            </p>
            <img
              src={unmg}
              alt="unmg logo"
              className="w-full max-w-[300px] lg:max-w-48"
            />
            <p className="font-semibold">
              INSPIRE LEADERSHIP CONSULTANCY, INC.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <Label className="text-white text-base" value="CONTACT US:" />
            <ul className="flex flex-col gap-2">
              {socials.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <a
                      target="_blank"
                      href={link.link}
                      rel="noreferrer"
                      className="flex items-center gap-2 text-lg p-2 rounded-full transition-all duration-300 hover:bg-white hover:text-[#DF0000]"
                    >
                      <Icon className="text-2xl" />
                      <p>{link.label}</p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="flex flex-col gap-3">
            <Label
              className="text-white text-base uppercase"
              value="Programs we offer:"
            />
            <FooterPrograms />
          </section>
          <section className="flex flex-col gap-2">
            <Label
              className="text-white text-base uppercase"
              value="For Inquiries:"
            />
            <p>
              Receive full details on our in-house training, keynote speakers,
              public seminars, and more!
            </p>
            <Button
              as={Link}
              to="/programs"
              className="w-fit mt-2"
              pill
              color="failure"
              theme={{
                color: {
                  failure:
                    "text-white bg-[#DF0000] border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
                },
              }}
            >
              LEARN MORE
            </Button>
          </section>
        </div>
        <hr />
        <p className="text-center">Copyright © 2024 by Inspire Leadership</p>
        <a
          href="#"
          className="text-red-500 hover:text-red-700 border-4 border-black transition-all hover:border-white aspect-square p-2 w-fit rounded-full absolute bottom-0 right-0 m-4 bg-transparent"
        >
          <FaArrowUp />
        </a>
      </footer>
    </>
  );
}

function UNMGMap() {
  const position = [14.556281, 121.0047];

  return (
    <>
      <MapContainer
        center={position}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%", maxWidth: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>HPL building, Sen Gil Puyat Avenue, Makati City.</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
function FooterPrograms() {
  const [programs, setPrograms] = useState(null);
  const { retrievePrograms } = usePrograms();
  let host = "http://localhost:5173/programs";
  host = "https://new.inspireleaders.com.ph/";
  useEffect(() => {
    const setup = async () => {
      const response = await retrievePrograms();
      setPrograms(response.splice(0, 3));
    };
    setup();
  }, []);

  return (
    programs && (
      <>
        {programs.map((program) => {
          return (
            <Link
              className="text-lg flex gap-4 items-center border-b border-black hover:border-[#DF0000] py-1 transition-all"
              to={`${host}programs/${program.program_id}`}
              key={program.program_id}
            >
              <FaDotCircle className="text-[#DF0000]" />
              {program.title}
            </Link>
          );
        })}
      </>
    )
  );
}
export default App;
