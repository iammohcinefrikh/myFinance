import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
  });

  const loadUser = async () => {
    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
    }
    
    else {
      delete axios.defaults.headers.common["x-auth-token"];
    }

    try {
      await axios.get("http://localhost:8080/api/v1/verify");
      setAuth((prevAuth) => ({
        ...prevAuth,
        isAuthenticated: true,
        loading: false,
      }));
    }
    
    catch (error) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        isAuthenticated: false,
        loading: false,
      }));
    }
  };

  const register = async (formData) => {
    await axios.post("http://localhost:8080/api/v1/register", formData);
  };

  const login = async (formData) => {
    const response = await axios.post("http://localhost:8080/api/v1/login", formData);
    localStorage.setItem("token", response.data.token);

    setAuth((prevAuth) => ({
      ...prevAuth,
      token: response.data.token
    }));

    loadUser();
  };

  const logout = () => {
    localStorage.removeItem("token");

    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };