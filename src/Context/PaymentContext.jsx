/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import { endpoints } from "./endpoints";

const PaymentsContext = React.createContext();

export default function usePayments() {
  return useContext(PaymentsContext);
}

export function PaymentsProvider({ children }) {
  //all functions here for a module
  const insertPayment = async (data) => {
    const formdata = new FormData();
    // formdata.append("bank_type", data.bank_type);
    formdata.append("bank_name", data.bank_name);
    formdata.append("card_name", data.card_name);
    formdata.append("acc_num", data.account_number);
    formdata.append("contact_num", data.mobile_number);
    try {
      const response = await axios.post(endpoints.payments, formdata);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const retrievePayments = async () => {
    try {
      const response = await axios.get(endpoints.payments);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updatePayment = async (data) => {
    const formdata = new FormData();
    formdata.append("id", data.payment_id);
    // formdata.append("bank_type", data.bank_type);
    formdata.append("bank_name", data.bank_name);
    formdata.append("card_name", data.card_name);
    formdata.append("acc_num", data.acc_num);
    formdata.append("contact_num", data.contact_number);
    try {
      const response = await axios.put(endpoints.payments, {
        ...data,
        id: data.payment_id,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deletePayment = async (id) => {
    try {
      const response = await axios.delete(endpoints.payments, {
        params: { id: id },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    retrievePayments,
    insertPayment,
    updatePayment,
    deletePayment,
    //all function names here
  };

  return (
    <PaymentsContext.Provider value={values}>
      {children}
    </PaymentsContext.Provider>
  );
}