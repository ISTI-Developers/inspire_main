/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import Card from "../Components/Homepage/Card";
import Testimonials from "../Components/Homepage/Testimonials";
import { Carousel, Button, Label, TextInput } from "flowbite-react";
import Banners from "../Components/Homepage/Banners/Banners";
import Learning from "../Components/Homepage/Learning/Learning";
import Clients from "../Components/Homepage/Clients/Clients";
import OurPrograms from "../Components/Homepage/OurPrograms/OurPrograms";
import UpcomingPrograms from "../Components/Homepage/UpcomingPrograms/UpcomingPrograms";
import { SubscriptionProvider } from "../Context/SubscriptionContext";
import { ClientProvider } from "../Context/ClientContext";
import useSubscription from "../Context/SubscriptionContext";
import { ProgramProvider } from "../Context/ProgramsContext";
import { BannerProvider } from "../Context/BannersContext";
import { PartnerProvider } from "../Context/PartnersContext";
import useTestimonials, {
  TestimonialsProvider,
} from "../Context/TestimonialsContext";

export default function Home() {
  return (
    <div>
      <BannerProvider>
        <Banners />
      </BannerProvider>
      <PartnerProvider>
        <Learning />
      </PartnerProvider>
      <ProgramProvider>
        <UpcomingPrograms />
      </ProgramProvider>
      <TestimonialsProvider>
        <Testimonial />
      </TestimonialsProvider>
      <ProgramProvider>
        <OurPrograms />
      </ProgramProvider>
      <SubscriptionProvider>
        <Speaker />
      </SubscriptionProvider>
      <ClientProvider>
        <Clients />
      </ClientProvider>
    </div>
  );
}
function Testimonial() {
  const { retrieveTestimonials } = useTestimonials();
  const [active, setActive] = useState(0);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const response = await retrieveTestimonials();
      setCards(response);
    };
    setup();
  }, []);

  return (
    <div className="w-full flex flex-col items-center mb-12">
      <h1 className="text-[#DF0000] font-bold text-3xl md:text-5xl lg:text-7xl">
        TESTIMONIALS
      </h1>
      {cards && (
        <>
          <Testimonials
            cards={cards.map((card, index) => {
              return {
                key: index,
                content: (
                  <Card
                    msg={card.recommendation}
                    name={card.name}
                    pos={`${card.company} - ${card.position}`}
                    index={index}
                    active={active}
                  />
                ),
              };
            })}
            height="350px"
            width="50%"
            margin="auto"
            showArrows={false}
            setActive={setActive}
          />

          <Carousel
            theme={{
              indicators: {
                active: {
                  off: "bg-gray-300 hover:bg:gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-800",
                  on: "bg-gray-600 dark:bg-gray-400",
                },
                base: "h-3 w-3 rounded-full",
                wrapper:
                  "absolute -bottom-7 left-1/2 flex -translate-x-1/2 space-x-3",
              },
            }}
            className="w-full  lg:hidden"
            leftControl=" "
            rightControl=" "
          >
            {cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  msg={card.recommendation}
                  name={card.name}
                  pos={`${card.company} - ${card.position}`}
                  index={index}
                  active={active}
                />
              );
            })}
          </Carousel>
        </>
      )}
    </div>
  );
}
function Speaker() {
  const { insertNewsletter } = useSubscription();
  const nameRef = useRef();
  const emailRef = useRef();
  const newsletter = async (e) => {
    e.preventDefault();
    if (nameRef === null || emailRef === null) return;
    const response = await insertNewsletter(
      nameRef.current.value,
      emailRef.current.value
    );
    nameRef.current.value = null;
    emailRef.current.value = null;
    alert(response);
  };
  return (
    <div className="w-full bg-black mt-10 mb-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col text-white bg-black gap-4 py-10 px-10 md:min-h-[10vh] items-center lg:flex-row lg:gap-16">
        <h1 className="w-full lg:leading-normal font-bold flex flex-col justify-center items-center lg:items-center">
          <span className="flex flex-wrap gap-2 text-2xl md:text-4xl lg:gap-3 lg:text-5xl text-white lg:items-center">
            Get{" "}
            <span className="flex text-[#DF0000] gap-2">
              Updated{" "}
              <span className="text-white">
                with <span className="">Inspire!</span>
              </span>
            </span>
          </span>
          <span className="flex text-white gap-2 text-sm md:text-lg font-normal mt-5">
            Join our mailing list for updates and special promos!
          </span>
        </h1>
        <form className="w-[80%] lg:w-[50%]">
          <div className="flex flex-col w-full gap-6">
            <TextInput
              theme={{
                field: {
                  input: {
                    base: "w-full border-2 border-t-black border-x-black hover:border-white transition-all duration-300",
                    colors: {
                      gray: "bg-transparent",
                    },
                  },
                },
              }}
              color="gray"
              ref={nameRef}
              sizing="lg"
              className="w-full"
              id="name1"
              type="text"
              placeholder="Name *"
              required
            />
            <TextInput
              theme={{
                field: {
                  input: {
                    base: "w-full border-2 border-t-black border-x-black hover:border-white transition-all duration-300",
                    colors: {
                      gray: "bg-transparent",
                    },
                  },
                },
              }}
              color="gray"
              ref={emailRef}
              sizing="lg"
              className="w-full"
              id="email1"
              type="email"
              placeholder="Email *"
              required
            />
          </div>
          <div className="flex mt-6 justify-center w-auto">
            <Button
              size="lg"
              className="w-full"
              theme={{
                color: {
                  failure:
                    "text-white bg-[#DF0000] border border-[#DF0000] enabled:hover:bg-transparent enabled:hover:text-[#DF0000] focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
                },
              }}
              color="failure"
              type="button"
              onClick={newsletter}
            >
              SUBSCRIBE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
