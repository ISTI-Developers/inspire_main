import { useState, useEffect } from "react";
import useBanner from "../../../Context/BannersContext";

const Banners = () => {
  const { retrieveBanners } = useBanner();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  let host = "http://localhost/inspiredb";
  // host = "https://new.inspireleaders.com.ph/api";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const setup = async () => {
      const response = await retrieveBanners();
      setImages(response);
    };
    setup();
  }, []);
  return (
    images && (
      <div className="relative overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={`${host}${image.banner}`}
            alt={`hero-${index}`}
            className={`w-full h-auto transition-opacity duration-2000 ${
              index === currentImage ? "block" : "hidden"
            }`}
          />
        ))}
      </div>
    )
  );
};

export default Banners;
