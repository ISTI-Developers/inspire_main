/* eslint-disable react/prop-types */
import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

export default function Testimonials(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => {setGoToSlide(index);props.setActive(index)} };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div
    className="hidden lg:block"
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.slow}
      />
      <hr className="mt-5 border-gray-400 w-full max-w-[1500px] mx-auto" />
    </div>
  );
}