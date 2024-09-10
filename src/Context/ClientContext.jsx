import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const ClientContext = React.createContext();

export default function useClient() {
  return useContext(ClientContext);
}

export function ClientProvider({ children }) {
  //all functions here for a module
  const insertClient = async (name, image) => {
    const formdata = new FormData();
    formdata.append("brand", name);
    formdata.append("images", image);
    try {
      const response = await axios.post(endpoints.client, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveClients = async () => {
    try {
      const response = await axios.get(endpoints.client);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateClient = async (id, name, image) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("brand", name);
    if (image) {
      formdata.append("images", image);
    }
    try {
      const response = await axios.post(endpoints.client, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(endpoints.client, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    insertClient,
    retrieveClients,
    updateClient,
    deleteClient,
    //all function names here
  };

  return (
    <ClientContext.Provider value={values}>{children}</ClientContext.Provider>
  );
}
