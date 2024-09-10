import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";


const NewsletterContext = React.createContext();

export default function useNewsletter() {
    return useContext(NewsletterContext);
}

export function NewsletterProvider({ children }) {
    //all functions here for a module
    const retrieveNewsletter = async () => {
        try {
            const response = await axios.get(endpoints.newsletter)
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };


    const values = {
        retrieveNewsletter
        //all function names here
    }

    return <NewsletterContext.Provider value={values}>{children}</NewsletterContext.Provider>
}