import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";

import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <>
      <Navigation />
    </>
  )
}

export default Home;