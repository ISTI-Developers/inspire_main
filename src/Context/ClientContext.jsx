import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";


const ClientContext = React.createContext();

export default function useClient(){  
  return useContext(ClientContext);
}

export function ClientProvider({ children }) {
    //all functions here for a module
  
    const retrieveClients = async () => {
      try {
        const response = await axios.get(endpoints.client)
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

  
    const values = {
      retrieveClients
      //all function names here
    }
  
    return <ClientContext.Provider value={values}>{children}</ClientContext.Provider>
  }