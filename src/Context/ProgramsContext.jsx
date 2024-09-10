/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const ProgramsContext = React.createContext();

export default function usePrograms() {
  return useContext(ProgramsContext);
}

export function ProgramsProvider({ children }) {
  //all functions here for a module
  const insertProgram = async (data, image) => {
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("data", JSON.stringify(data));
    try {
      const response = await axios.post(endpoints.programs, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrievePrograms = async () => {
    try {
      const response = await axios.get(endpoints.programs);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateProgram = async (id, data, image = null) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("data", JSON.stringify(data));
    if (image) {
      formdata.append("image", image);
    }
    try {
      const response = await axios.post(endpoints.programs, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteProgram = async (id) => {
    try {
      const response = await axios.delete(endpoints.programs, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveRegistrants = async () => {
    try {
      const response = await axios.get(endpoints.registration);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrievePrograms,
    insertProgram,
    updateProgram,
    deleteProgram,
    retrieveRegistrants,
    //all function names here
  };

  return (
    <ProgramsContext.Provider value={values}>
      {children}
    </ProgramsContext.Provider>
  );
}
