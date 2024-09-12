/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const TestimonialsContext = React.createContext();

export default function useTestimonials() {
  return useContext(TestimonialsContext);
}

export function TestimonialsProvider({ children }) {
  //all functions here for a module

  const retrieveTestimonials = async () => {
    try {
      const response = await axios.get(endpoints.testimonials);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveTestimonials,
    //all function names here
  };

  return (
    <TestimonialsContext.Provider value={values}>
      {children}
    </TestimonialsContext.Provider>
  );
}
