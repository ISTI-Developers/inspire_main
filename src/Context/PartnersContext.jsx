import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const PartnerContext = React.createContext();

export default function usePartner() {
  return useContext(PartnerContext);
}

export function PartnerProvider({ children }) {
  //all functions here for a module
  const insertPartner = async (name, image) => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("images", image);
    console.log(name, image);
    try {
      const response = await axios.post(endpoints.partners, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrievePartners = async () => {
    try {
      const response = await axios.get(endpoints.partners);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updatePartner = async (id, name, image) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", name);
    if (image) {
      formdata.append("images", image);
    }
    try {
      const response = await axios.post(endpoints.partners, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deletePartner = async (id) => {
    try {
      const response = await axios.delete(endpoints.partners, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    insertPartner,
    retrievePartners,
    updatePartner,
    deletePartner,
    //all function names here
  };

  return (
    <PartnerContext.Provider value={values}>{children}</PartnerContext.Provider>
  );
}
