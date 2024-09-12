import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const PartnerContext = React.createContext();

export default function usePartner() {
  return useContext(PartnerContext);
}

export function PartnerProvider({ children }) {
  //all functions here for a module

  const retrievePartners = async () => {
    try {
      const response = await axios.get(endpoints.partners);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrievePartners,
    //all function names here
  };

  return (
    <PartnerContext.Provider value={values}>{children}</PartnerContext.Provider>
  );
}
