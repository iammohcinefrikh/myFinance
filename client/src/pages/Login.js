import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: ""
  });
  const [isUserEmailValid, setIsUserEmailValid] = useState();
  const [isUserPasswordValid, setIsUserPasswordValid] = useState();
  const { login, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => setFormData({ 
    ...formData,
    [event.target.name]: event.target.value
  });

  const handleEmailValidation = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.userEmail || !emailRegex.test(formData.userEmail)) {
      setIsUserEmailValid(false);
    }

    else {
      setIsUserEmailValid(true);
    }
  }

  const handlePasswordValidation = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!formData.userPassword || !passwordRegex.test(formData.userPassword)) {
      setIsUserPasswordValid(false);
    }

    else {
      setIsUserPasswordValid(true);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleEmailValidation();
    handlePasswordValidation();

    if (isUserEmailValid && isUserPasswordValid) {
      await login(formData);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="text-center">Se connecter</h2>
          <p className="text-center">Veuillez saisir vos données d'identification pour vous connecter.</p>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="formEmail" label="Adresse électronique" className="mt-5">
              <Form.Control type="email" placeholder="Entrez votre adresse électronique" name="userEmail" value={formData.userEmail} onChange={handleChange} onBlur={handleEmailValidation} isValid={isUserEmailValid === true} isInvalid={isUserEmailValid === false} />
              <Form.Control.Feedback type="invalid">Veuillez saisir une adresse électronique valide.</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="formPassword" label="Mot de passe" className="mt-4">
              <Form.Control type="password" placeholder="Entrez votre mot de passe" name="userPassword" value={formData.userPassword} onChange={handleChange} onBlur={handlePasswordValidation} isValid={isUserPasswordValid === true} isInvalid={isUserPasswordValid === false} />
              <Form.Control.Feedback type="invalid">Veuillez saisir un mot de passe valide.</Form.Control.Feedback>
            </FloatingLabel>

            <Button variant="dark" type="submit" className="w-100 mt-5">Se connecter</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;