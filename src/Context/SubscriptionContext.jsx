import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const SubscriptionContext = React.createContext();

export default function useSubscription() {
  return useContext(SubscriptionContext);
}

export function SubscriptionProvider({ children }) {
  //all functions here for a module
  const insertNewsletter = async (name, email) => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    try {
      const response = await axios.post(endpoints.newsletter, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const insertInquiry = async (data) => {
    const formdata = new FormData();
    const files = data.documents;
    for (const key in data) {
      if (data[key]) {
        formdata.append(key, data[key]);
      }
    }
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formdata.append(`file_${i}`, files[i]);
      }
    }
    try {
      const response = await axios.post(endpoints.inquiry, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    insertNewsletter,
    insertInquiry,
    //all function names here
  };

  return (
    <SubscriptionContext.Provider value={values}>
      {children}
    </SubscriptionContext.Provider>
  );
}
