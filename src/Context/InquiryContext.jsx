import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";


const InquiryContext = React.createContext();

export default function useInquiry() {
    return useContext(InquiryContext);
}

export function InquiryProvider({ children }) {
    //all functions here for a module
    const retrieveInquiries = async () => {
        try {
            const response = await axios.get(endpoints.inquiry)
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };


    const values = {
        retrieveInquiries
        //all function names here
    }

    return <InquiryContext.Provider value={values}>{children}</InquiryContext.Provider>
}