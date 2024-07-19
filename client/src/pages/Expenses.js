import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import convertDateStringToIso from "../helpers/convertDateStringToIsoHelper";
import { addExpense, getExpenses } from "../services/expensesService";
import { getProfile }from "../services/profileService";

import Navigation from "../components/Navigation";
import { Container, Row, Col, Button, Card, Modal, Form, Stack, FloatingLabel } from "react-bootstrap";

const Expenses = () => {
  const [formData, setFormData] = useState({
    expenseName: "",
    expenseAmount: "",
    expenseDate: "",
    expenseCategory: ""
  });

  const [isExpenseNameValid, setIsExpenseNameValid] = useState();
  const [isExpenseAmountValid, setIsExpenseAmountValid] = useState();
  const [isExpenseDateValid, setIsExpenseDateValid] = useState();
  const [isExpenseCategoryValid, setIsExpenseCategoryValid] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getExpenses();
        setExpenses(expensesData?.expenses);

        const profileData = await getProfile();
        setProfile(profileData?.profile);

        setIsLoading(false);
      }

      catch (error) {
        setIsError(true);
        setErrorMessage(error?.response?.data?.message);
      }
    }

    fetchData();
  }, []);
  
  const handleVisibility = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
      setFormData({
        expenseName: "",
        expenseAmount: "",
        expenseDate: "",
        expenseCategory: ""
      });
      setIsExpenseNameValid();
      setIsExpenseAmountValid();
      setIsExpenseDateValid();
      setIsExpenseCategoryValid();
    }

    else {
      setIsModalVisible(true);
    }
  }

  const handleChange = (event) => setFormData({ 
    ...formData,
    [event.target.name]: event.target.value
  });

  const handleNameValidation = () => {
    if (!formData.expenseName || formData.expenseName.length < 2 || formData.expenseName.length > 35) {
      setIsExpenseNameValid(false);
    }

    else {
      setIsExpenseNameValid(true);
    }
  }

  const handleAmountValidation = () => {
    if (!formData.expenseAmount || isNaN(formData.expenseAmount) || formData.expenseAmount <= 0) {
      setIsExpenseAmountValid(false);
    }

    else {
      setIsExpenseAmountValid(true);
    }
  }

  const handleDateValidation = () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    if (!formData.expenseDate || !dateRegex.test(formData.expenseDate)) {
      setIsExpenseDateValid(false);
    }

    else {
      setIsExpenseDateValid(true);
    }
  }

  const handleCategoryValidation = () => {
    if(!formData.expenseCategory) {
      setIsExpenseCategoryValid(false);
    }

    else {
      setIsExpenseCategoryValid(true);
    }
  }

  const handleSubmit = async () => {
    handleNameValidation();
    handleAmountValidation();
    handleDateValidation();
    handleCategoryValidation();

    if (isExpenseNameValid && isExpenseAmountValid && isExpenseDateValid && isExpenseCategoryValid) {
      const result = await addExpense(formData.expenseName, formData.expenseAmount, convertDateStringToIso(formData.expenseDate), formData.expenseCategory);

      if (result.status) {
        let updatedExpenses = [...expenses];
        updatedExpenses.push(result.expense);
        setExpenses(updatedExpenses);

        setIsModalVisible(false);
        setFormData({
          expenseName: "",
          expenseAmount: "",
          expenseDate: "",
          expenseCategory: ""
        });
        setIsExpenseNameValid();
        setIsExpenseAmountValid();
        setIsExpenseDateValid();
        setIsExpenseCategoryValid();
      }
    }
  }

  const handleClick = (category) => {
    navigate(`/expenses/${category}`);
  };

  const calculateTotalExpense = (expenses, category) => {
    const filteredExpenses = expenses.filter(expense => expense.expenseCategory === category);
  
    let totalExpense = 0;
    filteredExpenses.forEach(expense => {
      totalExpense += expense.expenseAmount;
    });
  
    return totalExpense;
  }

  const calculatePercentageOfBudget = (expenses, category, profile, budgetKey) => {
    const budgetValue = profile[budgetKey];
  
    if (!budgetValue) {
      return "Budget non spécifié";
    }
  
    const totalExpense = calculateTotalExpense(expenses, category);
  
    const percentage = (totalExpense / budgetValue) * 100;
  
    return Math.round(percentage);
  }

  return (
    <>
      <Navigation />
      {isLoading ? null : ( isError || !profile ? (
        <div className="error-message-container">
          <h1>Oh, c'est pas vrai! Quelque chose ne va pas.</h1>
          <p>Veuillez réessayer plus tard. Si le problème persiste, signalez cette error <i>"{errorMessage}"</i> à l'équipe d'assistance </p>
        </div>
      ) : (
        <Container className="my-5">
          <Row className="d-flex justify-content-between align-items-center mb-5">
            <Col xs="auto">
              <h2 style={{ marginBottom: 0 }}>Dépenses</h2>
            </Col>
            <Col xs="auto" className="d-flex align-items-center">
              <Button variant="dark" onClick={handleVisibility}>Soumettre une dépense</Button>
            </Col>
          </Row>

          <div className="expense-category-cards">
            <Card className="expense-category-card" onClick={() => handleClick("utility")}>
              <Card.Body>
                <Card.Title>Utilitaires</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Utility", profile, "profileUtilitiesBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Utility", profile, "profileUtilitiesBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Utility")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Utility", profile, "profileUtilitiesBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Utility", profile, "profileUtilitiesBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("groceries")}>
              <Card.Body>
                <Card.Title>Épicerie</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Groceries", profile, "profileGroceriesBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Groceries", profile, "profileGroceriesBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Groceries")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Groceries", profile, "profileGroceriesBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Groceries", profile, "profileGroceriesBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("housing")}>
              <Card.Body>
                <Card.Title>Logement</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Housing", profile, "profileHousingBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Housing", profile, "profileHousingBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Housing")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Housing", profile, "profileHousingBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Housing", profile, "profileHousingBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("transport")}>
              <Card.Body>
                <Card.Title>Transport</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Transport", profile, "profileTransportBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Transport", profile, "profileTransportBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Transport")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Transport", profile, "profileTransportBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Transport", profile, "profileTransportBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("health")}>
              <Card.Body>
                <Card.Title>Santé</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Health", profile, "profileHealthBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Health", profile, "profileHealthBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Health")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Health", profile, "profileHealthBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Health", profile, "profileHealthBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("education")}>
              <Card.Body>
                <Card.Title>Éducation</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Education", profile, "profileEducationBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Education", profile, "profileEducationBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Education")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Education", profile, "profileEducationBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Education", profile, "profileEducationBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("hobbies")}>
              <Card.Body>
                <Card.Title>Loisirs</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Hobbies", profile, "profileHobbiesBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Hobbies", profile, "profileHobbiesBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Hobbies")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Hobbies", profile, "profileHobbiesBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Hobbies", profile, "profileHobbiesBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="expense-category-card" onClick={() => handleClick("savings")}>
              <Card.Body>
                <Card.Title>Épargne</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Savings", profile, "profileSavingsBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Savings", profile, "profileSavingsBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Savings")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Savings", profile, "profileSavingsBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Savings", profile, "profileSavingsBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>
            
            <Card className="expense-category-card" onClick={() => handleClick("miscellaneous")}>
              <Card.Body>
                <Card.Title>Divers</Card.Title>
                <Card.Subtitle className={isNaN(calculatePercentageOfBudget(expenses, "Miscellaneous", profile, "profileMiscellaneousBudget")) ? "text-muted" : (calculatePercentageOfBudget(expenses, "Miscellaneous", profile, "profileMiscellaneousBudget") >= 100 ? "text-danger" : "text-success")}>{calculateTotalExpense(expenses, "Miscellaneous")}DH dépensé – {isNaN(calculatePercentageOfBudget(expenses, "Miscellaneous", profile, "profileMiscellaneousBudget")) ? "Budget non spécifié" : calculatePercentageOfBudget(expenses, "Miscellaneous", profile, "profileMiscellaneousBudget") + "% du budget"}</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>

          <Modal show={isModalVisible} onHide={handleVisibility} animation={false} centered>
            <Modal.Body>
              <h4 className="mb-0 mt-2">Soumettre une dépense</h4>

              <Form className="mt-5">
                <FloatingLabel controlId="formName" label="Nom de la dépense">
                  <Form.Control type="text" placeholder="Saisir le nom de la dépense" name="expenseName" value={formData.expenseName} onChange={handleChange} onBlur={handleNameValidation} isValid={isExpenseNameValid === true} isInvalid={isExpenseNameValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un nom valide.</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="formAmount" label="Montant de la dépense" className="mt-4">
                  <Form.Control type="text" placeholder="Saisir le montant de la dépense" name="expenseAmount" value={formData.expenseAmount} onChange={handleChange} onBlur={handleAmountValidation} isValid={isExpenseAmountValid === true} isInvalid={isExpenseAmountValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir un montant valide.</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="formDate" label="Date de la dépense" className="mt-4">
                  <Form.Control type="text" placeholder="Saisir la date de la dépense" name="expenseDate" value={formData.expenseDate} onChange={handleChange} onBlur={handleDateValidation} isValid={isExpenseDateValid === true} isInvalid={isExpenseDateValid === false} />
                  <Form.Control.Feedback type="invalid">Veuillez saisir une date valide.</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="formCategory" label="Catégorie de la dépense" className="mt-4">
                  <Form.Select name="expenseCategory" value={formData.expenseCategory} onChange={handleChange} onBlur={handleCategoryValidation} isValid={isExpenseCategoryValid === true} isInvalid={isExpenseCategoryValid === false} >
                    <option value="" disabled>Sélectionner une catégorie de dépense</option>
                    <option value="Utility">Utilitaires</option>
                    <option value="Groceries">Épicerie</option>
                    <option value="Housing">Logement</option>
                    <option value="Transport">Transport</option>
                    <option value="Health">Santé</option>
                    <option value="Education">Éducation</option>
                    <option value="Hobbies">Loisirs</option>
                    <option value="Savings">Épargne</option>
                    <option value="Miscellaneous">Divers</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Veuillez sélectionner une catégorie de dépense.</Form.Control.Feedback>
                </FloatingLabel>
              </Form>

              <Stack gap={2} className="mx-auto mt-5">
                <Button variant="dark" onClick={handleSubmit}>Soumettre</Button>
                <Button variant="outline-dark" onClick={handleVisibility}>Annuler</Button>
              </Stack>
            </Modal.Body>
          </Modal>
        </Container>
      ))}
    </>
  );
}

export default Expenses;