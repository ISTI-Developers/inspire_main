import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const BlogsContext = React.createContext();

export default function useBlogs() {
  return useContext(BlogsContext);
}

export function BlogsProvider({ children }) {
  //all functions here for a module

  const retrieveBlogs = async () => {
    try {
      const response = await axios.get(endpoints.blogs);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const retrieveBlog = async (id) => {
    try {
      const response = await axios.get(endpoints.blogs + `?id=${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveBlogs,
    retrieveBlog,
    //all function names here
  };

  return (
    <BlogsContext.Provider value={values}>{children}</BlogsContext.Provider>
  );
}
