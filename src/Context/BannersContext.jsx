import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const BannerContext = React.createContext();

export default function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({ children }) {
  //all functions here for a module
  const insertBanner = async (name, banner) => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("banner", banner);
    try {
      const response = await axios.post(endpoints.banners, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveBanners = async () => {
    try {
      const response = await axios.get(endpoints.banners);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateBanner = async (id, name, banner) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", name);
    if (banner) {
      formdata.append("banner", banner);
    }
    try {
      const response = await axios.post(endpoints.banners, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(endpoints.banners, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    insertBanner,
    retrieveBanners,
    updateBanner,
    deleteBanner,
    //all function names here
  };

  return (
    <BannerContext.Provider value={values}>{children}</BannerContext.Provider>
  );
}
