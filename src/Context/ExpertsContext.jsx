import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const ExpertsContext = React.createContext();

export default function useExperts() {
  return useContext(ExpertsContext);
}

export function ExpertsProvider({ children }) {
  //all functions here for a module
  const insertExpert = async (images, data) => {
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    images.forEach((image, index) => {
      formdata.append(`file_${index}`, image);
    });
    try {
      const response = await axios.post(endpoints.experts, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveExperts = async () => {
    try {
      const response = await axios.get(endpoints.experts);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateExpert = async (id, image, data) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("data", JSON.stringify(data));
    if (image) {
      image.forEach((image, index) => {
        formdata.append(`file_${index}`, image);
      });
    }
    try {
      const response = await axios.post(endpoints.experts, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteExpert = async (id) => {
    try {
      const response = await axios.delete(endpoints.experts, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveExperts,
    insertExpert,
    updateExpert,
    deleteExpert,
    //all function names here
  };

  return (
    <ExpertsContext.Provider value={values}>{children}</ExpertsContext.Provider>
  );
}
