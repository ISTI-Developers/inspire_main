import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const ExpertsContext = React.createContext();

export default function useExperts() {
  return useContext(ExpertsContext);
}

export function ExpertsProvider({ children }) {
  //all functions here for a module

  const retrieveExperts = async () => {
    try {
      const response = await axios.get(endpoints.experts);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveExperts,
    //all function names here
  };

  return (
    <ExpertsContext.Provider value={values}>{children}</ExpertsContext.Provider>
  );
}
