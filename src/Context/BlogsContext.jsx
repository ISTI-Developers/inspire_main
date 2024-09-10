import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const BlogsContext = React.createContext();

export default function useBlogs() {
  return useContext(BlogsContext);
}

export function BlogsProvider({ children }) {
  //all functions here for a module
  const insertBlog = async (title, image, content) => {
    const formdata = new FormData();
    formdata.append(
      "data",
      JSON.stringify({
        title: title,
        content: content,
      })
    );
    formdata.append("image", image);
    try {
      const response = await axios.post(endpoints.blogs, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveBlogs = async () => {
    try {
      const response = await axios.get(endpoints.blogs);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateBlog = async (id, title, content, path, image) => {
    const formdata = new FormData();
    const newdata = {
      title: title,
      content: content,
      path: path,
    };

    formdata.append("id", id);
    if (typeof image === "string") {
      newdata.image = image;
    } else {
      formdata.append("image", image);
    }
    formdata.append("data", JSON.stringify(newdata));
    try {
      const response = await axios.post(endpoints.blogs, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(endpoints.blogs, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrieveBlogs,
    insertBlog,
    updateBlog,
    deleteBlog,
    //all function names here
  };

  return (
    <BlogsContext.Provider value={values}>{children}</BlogsContext.Provider>
  );
}
