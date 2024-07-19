import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LocalContext = createContext();
const OK = 200;

const LocalProvider = ({ children }) => {
  const [expensesList, setExpensesList] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);

  const [isExpensesFetched, setIsExpensesFetched] = useState();
  const [isProfileFetched, setIsProfileFetched] = useState();

  const { auth } = useContext(AuthContext);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/expenses");

      if (response?.data?.statusCode === OK) {
        setExpensesList(response?.data?.expenses);
        setIsExpensesFetched(true);
      }
    }
    
    catch (error) {
      if (!error?.response) {
        console.log("No response from server");
      }

      else {
        console.log(error?.response?.data?.message);
      }
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/profile");

      if (response?.data?.statusCode === OK) {
        setProfileDetails(response?.data?.profile);
        setIsProfileFetched(true);
      }
    }

    catch (error) {
      if (!error?.response) {
        console.log("No response from server");
      }

      else {
        console.log(error?.response?.data?.message);
      }
    }
  }
 
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchExpenses();
      fetchProfile();
    }
  }, [auth]);

  return (
    <LocalContext.Provider value={{ isExpensesFetched, expensesList, setExpensesList, isProfileFetched, profileDetails, setProfileDetails }}>
      {children}
    </LocalContext.Provider>
  );
};

export { LocalContext, LocalProvider };