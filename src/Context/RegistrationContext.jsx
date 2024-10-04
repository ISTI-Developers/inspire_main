import React, { useContext, createContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const RegistrationContext = createContext();

export default function useRegistration() {
  return useContext(RegistrationContext);
}

export function RegistrationProvider({ children }) {
  //all functions here for a module
  const insertRegistration = async (
    registration_type,
    first_name,
    last_name,
    email_address,
    mobile_number,
    ref_name,
    proof,
    tin_num,
    source_platform,
    program_id,
    company_name,
    position,
    more_than_ten
  ) => {
    const formdata = new FormData();
    formdata.append("registration_type", registration_type);
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("email_address", email_address);
    formdata.append("mobile_number", mobile_number);
    formdata.append("ref_name", ref_name);
    formdata.append("proof", proof);
    formdata.append("tin_num", tin_num);
    formdata.append("source_platform", source_platform);
    formdata.append("program_id", program_id);
    formdata.append("company_name", company_name);
    formdata.append("position", position);
    formdata.append("more_than_ten", more_than_ten);
    try {
      const response = await axios.post(endpoints.registration, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const values = {
    insertRegistration,
    //all function names here
  };

  return (
    <RegistrationContext.Provider value={values}>
      {children}
    </RegistrationContext.Provider>
  );
}
