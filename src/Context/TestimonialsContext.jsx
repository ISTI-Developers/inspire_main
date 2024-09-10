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
  const insertTestimonial = async (data) => {
    const formdata = new FormData();
    formdata.append("recommendation", data.recommendation);
    formdata.append("name", data.name);
    formdata.append("company", data.company);
    formdata.append("position", data.position);
    try {
      const response = await axios.post(endpoints.testimonials, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveTestimonials = async () => {
    try {
      const response = await axios.get(endpoints.testimonials);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateTestimonial = async (data) => {
    // const formdata = new FormData();
    // formdata.append("id", data.payment_id);
    // formdata.append("recommendation", data.recommendation);
    // formdata.append("name", data.name);
    // formdata.append("company", data.company);
    // formdata.append("position", data.position);
    try {
      const response = await axios.put(endpoints.testimonials, {
        ...data,
        id: data.payment_id,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteTestimonial = async (id) => {
    try {
      const response = await axios.delete(endpoints.testimonials, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveTestimonials,
    insertTestimonial,
    updateTestimonial,
    deleteTestimonial,
    //all function names here
  };

  return (
    <TestimonialsContext.Provider value={values}>
      {children}
    </TestimonialsContext.Provider>
  );
}