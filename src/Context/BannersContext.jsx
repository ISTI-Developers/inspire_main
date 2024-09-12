import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const BannerContext = React.createContext();

export default function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({ children }) {
  //all functions here for a module

  const retrieveBanners = async () => {
    try {
      const response = await axios.get(endpoints.banners);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveBanners,
    //all function names here
  };

  return (
    <BannerContext.Provider value={values}>{children}</BannerContext.Provider>
  );
}
