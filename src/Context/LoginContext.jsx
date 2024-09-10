import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const LoginContext = React.createContext();

export default function useLogin(){
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  //all functions here for a module
  const insertCredentials = async (username, password) => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    try {
      const response = await axios.post(endpoints.login, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };


  const values = {
    insertCredentials
    //all function names here
  }

  return <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
}