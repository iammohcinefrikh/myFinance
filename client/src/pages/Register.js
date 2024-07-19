import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    isSubscribed: true
  });
  const [isUserFirstNameValid, setIsUserFirstNameValid] = useState("");
  const [isUserLastNameValid, setIsUserLastNameValid] = useState("");
  const [isUserEmailValid, setIsUserEmailValid] = useState();
  const [isUserPasswordValid, setIsUserPasswordValid] = useState();
  const { register, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => setFormData({ 
    ...formData,
    [event.target.name]: event.target.value
  });

  const handleLastNameValidation = () => {
    if (!formData.userLastName || formData.userLastName.length < 2 || formData.userLastName.length > 35) {
      setIsUserLastNameValid(false);
    }

    else {
      setIsUserLastNameValid(true);
    }
  }

  const handleFirstNameValidation = () => {
    if (!formData.userFirstName || formData.userFirstName.length < 2 || formData.userFirstName.length > 35) {
      setIsUserFirstNameValid(false);
    }

    else {
      setIsUserFirstNameValid(true);
    }
  }

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

    handleLastNameValidation();
    handleFirstNameValidation();
    handleEmailValidation();
    handlePasswordValidation();

    if (isUserFirstNameValid && isUserLastNameValid && isUserEmailValid && isUserPasswordValid) {
      await register(formData);
      navigate("/login");
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
          <h2 className="text-center">S'enregistrer</h2>
          <p className="text-center">Veuillez remplir le formulaire pour créer un compte.</p>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="formFirstName" label="Nom" className="mt-5">
              <Form.Control type="text" placeholder="Entrez votre nom" name="userLastName" value={formData.userLastName} onChange={handleChange} onBlur={handleLastNameValidation} isValid={isUserLastNameValid === true} isInvalid={isUserLastNameValid === false} />
              <Form.Control.Feedback type="invalid">Veuillez saisir un nom valide.</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="formLastName" label="Prénom" className="mt-4">
              <Form.Control type="text" placeholder="Entrez votre prénom" name="userFirstName" value={formData.userFirstName} onChange={handleChange} onBlur={handleFirstNameValidation} isValid={isUserFirstNameValid === true} isInvalid={isUserFirstNameValid === false} />
              <Form.Control.Feedback type="invalid">Veuillez saisir un prénom valide.</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="formEmail" label="Adresse électronique" className="mt-4">
              <Form.Control type="email" placeholder="Entrez votre adresse électronique" name="userEmail" value={formData.userEmail} onChange={handleChange} onBlur={handleEmailValidation} isValid={isUserEmailValid === true} isInvalid={isUserEmailValid === false} />
              <Form.Control.Feedback type="invalid">Veuillez saisir une adresse électronique valide.</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="formPassword" label="Mot de passe" className="mt-4">
              <Form.Control type="password" placeholder="Entrez votre mot de passe" name="userPassword" value={formData.userPassword} onChange={handleChange} onBlur={handlePasswordValidation} isValid={isUserPasswordValid === true} isInvalid={isUserPasswordValid === false} />
              <Form.Control.Feedback type="invalid">Veuillez saisir un mot de passe valide.</Form.Control.Feedback>
            </FloatingLabel>

            <Form.Group className="mt-4" controlId="formNewsletter">
              <Form.Check type="checkbox" label="En cochant cette case, vous acceptez de recevoir notre newsletter et autres e-mails marketing." checked={formData.isSubscribed} onChange={(event) => { setFormData({ ...formData, isSubscribed: event.target.checked}) }} />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-4">S'enregistrer</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;