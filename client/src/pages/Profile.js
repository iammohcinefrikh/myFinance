import React, { useEffect, useState } from "react";

import { getProfile, updateProfile } from "../services/profileService";

import Navigation from "../components/Navigation";
import { Container, Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";

const Profile = () => {
  const [formData, setFormData] = useState({
    profileMonthlyBudget: "",
    profileUtilitiesBudget: "",
    profileGroceriesBudget: "",
    profileHousingBudget: "",
    profileTransportBudget: "",
    profileHealthBudget: "",
    profileEducationBudget: "",
    profileHobbiesBudget: "",
    profileSavingsBudget: "",
    profileMiscellaneousBudget: ""
  });

  const [isMonthlyBudgetValid, setIsMonthlyBudgetValid] = useState(true);
  const [isUtilitiesBudgetValid, setIsUtilitiesBudgetValid] = useState(true);
  const [isGroceriesBudgetValid, setIsGroceriesBudgetValid] = useState(true);
  const [isHousingBudgetValid, setIsHousingBudgetValid] = useState(true);
  const [isTransportBudgetValid, setIsTransportBudgetValid] = useState(true);
  const [isHealthBudgetValid, setIsHealthBudgetValid] = useState(true);
  const [isEducationBudgetValid, setIsEducationBudgetValid] = useState(true);
  const [isHobbiesBudgetValid, setIsHobbiesBudgetValid] = useState(true);
  const [isSavingsBudgetValid, setIsSavingsBudgetValid] = useState(true);
  const [isMiscellaneousBudgetValid, setIsMiscellaneousBudgetValid] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setFormData({
          profileMonthlyBudget: data.profile.profileMonthlyBudget ? data.profile.profileMonthlyBudget : "",
          profileUtilitiesBudget: data.profile.profileUtilitiesBudget ? data.profile.profileUtilitiesBudget : "",
          profileGroceriesBudget: data.profile.profileGroceriesBudget ? data.profile.profileGroceriesBudget : "",
          profileHousingBudget: data.profile.profileHousingBudget ? data.profile.profileHousingBudget : "",
          profileTransportBudget: data.profile.profileTransportBudget ? data.profile.profileTransportBudget : "",
          profileHealthBudget: data.profile.profileHealthBudget ? data.profile.profileHealthBudget : "",
          profileEducationBudget: data.profile.profileEducationBudget ? data.profile.profileEducationBudget : "",
          profileHobbiesBudget: data.profile.profileHobbiesBudget ? data.profile.profileHobbiesBudget : "",
          profileSavingsBudget: data.profile.profileSavingsBudget ? data.profile.profileSavingsBudget : "",
          profileMiscellaneousBudget: data.profile.profileMiscellaneousBudget ? data.profile.profileMiscellaneousBudget : ""
        });
      }

      catch (error) {
        setIsError(true);
        setErrorMessage(error?.response?.data?.message);
      }

      setIsLoading(false);
    }
    
    fetchData();
  }, []);

  const handleChange = (event) => setFormData({ 
    ...formData,
    [event.target.name]: event.target.value
  });

  const monthlyBudgetValidation = () => {
    if (!formData.profileMonthlyBudget || isNaN(formData.profileMonthlyBudget) || formData.profileMonthlyBudget < 0 ) {
      setIsMonthlyBudgetValid(false);
    }

    else {
      setIsMonthlyBudgetValid(true);
    }
  }

  const utilitiesBudgetValidation = () => {
    if (!formData.profileUtilitiesBudget || isNaN(formData.profileUtilitiesBudget) || formData.profileUtilitiesBudget < 0 ) {
      setIsUtilitiesBudgetValid(false);
    }

    else {
      setIsUtilitiesBudgetValid(true);
    }
  }

  const groceriesBudgetValidation = () => {
    if (!formData.profileGroceriesBudget || isNaN(formData.profileGroceriesBudget) || formData.profileGroceriesBudget < 0 ) {
      setIsGroceriesBudgetValid(false);
    }

    else {
      setIsGroceriesBudgetValid(true);
    }
  }

  const housingBudgetValidation = () => {
    if (!formData.profileHousingBudget || isNaN(formData.profileHousingBudget) || formData.profileHousingBudget < 0 ) {
      setIsHousingBudgetValid(false);
    }

    else {
      setIsHousingBudgetValid(true);
    }
  }

  const transportBudgetValidation = () => {
    if (!formData.profileTransportBudget || isNaN(formData.profileTransportBudget) || formData.profileTransportBudget < 0 ) {
      setIsTransportBudgetValid(false);
    }

    else {
      setIsTransportBudgetValid(true);
    }
  }

  const healthBudgetValidation = () => {
    if (!formData.profileHealthBudget || isNaN(formData.profileHealthBudget) || formData.profileHealthBudget < 0 ) {
      setIsHealthBudgetValid(false);
    }

    else {
      setIsHealthBudgetValid(true);
    }
  }

  const educationBudgetValidation = () => {
    if (!formData.profileEducationBudget || isNaN(formData.profileEducationBudget) || formData.profileEducationBudget < 0 ) {
      setIsEducationBudgetValid(false);
    }

    else {
      setIsEducationBudgetValid(true);
    }
  }

  const hobbiesBudgetValidation = () => {
    if (!formData.profileHobbiesBudget || isNaN(formData.profileHobbiesBudget) || formData.profileHobbiesBudget < 0 ) {
      setIsHobbiesBudgetValid(false);
    }

    else {
      setIsHobbiesBudgetValid(true);
    }
  }

  const savingsBudgetValidation = () => {
    if (!formData.profileSavingsBudget || isNaN(formData.profileSavingsBudget) || formData.profileSavingsBudget < 0 ) {
      setIsSavingsBudgetValid(false);
    }

    else {
      setIsSavingsBudgetValid(true);
    }
  }

  const miscellaneousBudgetValidation = () => {
    if (!formData.profileMiscellaneousBudget || isNaN(formData.profileMiscellaneousBudget) || formData.profileMiscellaneousBudget < 0 ) {
      setIsMiscellaneousBudgetValid(false);
    }

    else {
      setIsMiscellaneousBudgetValid(true);
    }
  }

  const handleSubmit = async () => {
    monthlyBudgetValidation();
    utilitiesBudgetValidation();
    groceriesBudgetValidation();
    housingBudgetValidation();
    transportBudgetValidation();
    healthBudgetValidation();
    educationBudgetValidation();
    hobbiesBudgetValidation();
    savingsBudgetValidation();
    miscellaneousBudgetValidation();

    if (isMonthlyBudgetValid && isUtilitiesBudgetValid && isGroceriesBudgetValid && isHousingBudgetValid && isTransportBudgetValid && isHealthBudgetValid && isEducationBudgetValid && isHobbiesBudgetValid && isSavingsBudgetValid && isMiscellaneousBudgetValid) {
      try {
        const response = await updateProfile(formData);

        if (response) {

          alert("Profil mis à jour avec succès");
        }
      }

      catch (error) {
        if (!error?.response) {
          alert("Pas de réponse du serveur");
        }
  
        else {
          alert(error?.response?.data?.message);
        }
      }
    }
  }

  return (
    <>
      <Navigation />
      {isLoading ? null : ( isError ? (
        <div className="error-message-container">
          <h1>Oh, c'est pas vrai! Quelque chose ne va pas.</h1>
          <p>Veuillez réessayer plus tard. Si le problème persiste, signalez cette error <i>"{errorMessage}"</i> à l'équipe d'assistance </p>
        </div>
      ) : (
        <Container>
          <Row className="d-flex justify-content-between align-items-center my-5">
            <Col xs="auto">
              <h2 style={{ marginBottom: 0 }}>Profile</h2>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} md={12} lg={8}>
            <Row className="g-3 mt-0">
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileMonthlyBudget" label="Budget">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité" name="profileMonthlyBudget" value={formData.profileMonthlyBudget} onChange={handleChange} onBlur={monthlyBudgetValidation} isValid={isMonthlyBudgetValid === true} isInvalid={isMonthlyBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileUtilitiesBudget" label="Budget des utilitaires">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour les utilitaires" name="profileUtilitiesBudget" value={formData.profileUtilitiesBudget} onChange={handleChange} onBlur={utilitiesBudgetValidation} isValid={isUtilitiesBudgetValid === true} isInvalid={isUtilitiesBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="g-3 mt-4">
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileGroceriesBudget" label="Budget d'épicerie">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour l'épicerie" name="profileGroceriesBudget" value={formData.profileGroceriesBudget} onChange={handleChange} onBlur={groceriesBudgetValidation} isValid={isGroceriesBudgetValid === true} isInvalid={isGroceriesBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileHousingBudget" label="Budget du logement">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour le logement" name="profileHousingBudget" value={formData.profileHousingBudget} onChange={handleChange} onBlur={housingBudgetValidation} isValid={isHousingBudgetValid === true} isInvalid={isHousingBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="g-3 mt-4">
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileTransportBudget" label="Budget des transports">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour les transports" name="profileTransportBudget" value={formData.profileTransportBudget} onChange={handleChange} onBlur={transportBudgetValidation} isValid={isTransportBudgetValid === true} isInvalid={isTransportBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileHealthBudget" label="Budget de santé">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour la santé" name="profileHealthBudget" value={formData.profileHealthBudget} onChange={handleChange} onBlur={healthBudgetValidation} isValid={isHealthBudgetValid === true} isInvalid={isHealthBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="g-3 mt-4">
              <Col xs={6} className="mt-0">
              <FloatingLabel controlId="profileEducationBudget" label="Budget de l'éducation">
                <Form.Control type="text" placeholder="Saisir le budget souhaité pour l'éducation" name="profileEducationBudget" value={formData.profileEducationBudget} onChange={handleChange} onBlur={educationBudgetValidation} isValid={isEducationBudgetValid === true} isInvalid={isEducationBudgetValid === false} />
                <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
              </FloatingLabel>
              </Col>
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileHobbiesBudget" label="Budget de loisirs">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour les loisirs" name="profileHobbiesBudget" value={formData.profileHobbiesBudget} onChange={handleChange} onBlur={hobbiesBudgetValidation} isValid={isHobbiesBudgetValid === true} isInvalid={isHobbiesBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="g-3 mt-4">
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileSavingsBudget" label="Budget d'épargne">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour l'épargne" name="profileSavingsBudget" value={formData.profileSavingsBudget} onChange={handleChange} onBlur={savingsBudgetValidation} isValid={isSavingsBudgetValid === true} isInvalid={isSavingsBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={6} className="mt-0">
                <FloatingLabel controlId="profileMiscellaneousBudget" label="Budget divers">
                  <Form.Control type="text" placeholder="Saisir le budget souhaité pour les dépenses diverses" name="profileMiscellaneousBudget" value={formData.profileMiscellaneousBudget} onChange={handleChange} onBlur={miscellaneousBudgetValidation} isValid={isMiscellaneousBudgetValid === true} isInvalid={isMiscellaneousBudgetValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un budget valide.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

              <Button variant="dark" className="w-100 mt-5" onClick={handleSubmit}>Soumettre</Button>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  )
}

export default Profile;