import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const ProgramsContext = React.createContext();

export default function usePrograms() {
  return useContext(ProgramsContext);
}

export function ProgramProvider({ children }) {
  //all functions here for a module

  const retrievePrograms = async () => {
    try {
      const response = await axios.get(endpoints.programs);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const retrieveProgram = async (id) => {
    try {
      const response = await axios.get(endpoints.programs + `?id=${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrievePrograms,
    retrieveProgram,
    //all function names here
  };

  return (
    <ProgramsContext.Provider value={values}>
      {children}
    </ProgramsContext.Provider>
  );
}
