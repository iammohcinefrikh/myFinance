import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import convertIsoToDateString from "../helpers/convertIsoToDateStringHelper";
import convertDateStringToIso from "../helpers/convertDateStringToIsoHelper";
import { getExpenses, modifyExpense } from "../services/expensesService";
import { deleteExpense } from "../services/expensesService";

import Navigation from "../components/Navigation";
import { Container, Row, Col, Button, Card, Modal, Form, Stack, FloatingLabel } from "react-bootstrap";

const ViewCategoryExpenses = () => {
  const { category } = useParams();
  const sentenceCaseCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const categoriesInFrench = {
    "Utility": "Utilitaires",
    "Groceries": "Épicerie",
    "Housing": "Logement",
    "Transport": "Transport",
    "Health": "Santé",
    "Education": "Éducation",
    "Hobbies": "Loisirs",
    "Savings": "Épargne",
    "Miscellaneous": "Divers"
  };

  const [formData, setFormData] = useState({
    expenseName: "",
    expenseAmount: "",
    expenseDate: "",
    expenseCategory: ""
  });

  const [isExpenseNameValid, setIsExpenseNameValid] = useState(true);
  const [isExpenseAmountValid, setIsExpenseAmountValid] = useState(true);
  const [isExpenseDateValid, setIsExpenseDateValid] = useState(true);
  const [isExpenseCategoryValid, setIsExpenseCategoryValid] = useState(true);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenseId, setSelectedExpenseId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data?.expenses.filter(expense => expense.expenseCategory === sentenceCaseCategory));
      }

      catch (error) {
        setIsError(true);
        setErrorMessage(error?.response?.data?.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [sentenceCaseCategory]);

  const handleModifyModalVisibility = () => {
    if (isModifyModalVisible) {
      setIsModifyModalVisible(false);
      setFormData({
        expenseName: "",
        expenseAmount: "",
        expenseDate: "",
        expenseCategory: ""
      });
      setIsExpenseNameValid(true);
      setIsExpenseAmountValid(true);
      setIsExpenseDateValid(true);
      setIsExpenseCategoryValid(true);
      setSelectedExpenseId("");
    }

    else {
      setIsModifyModalVisible(true);
    }
  }

  const handleDeleteModalVisibility = () => {
    if (isDeleteModalVisible) {
      setIsDeleteModalVisible(false);
      setSelectedExpenseId("");
    }

    else {
      setIsModifyModalVisible(true);
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

  const updateExpense = (expenseId, newExpenseData) => {
    const updatedExpenses = expenses.map(expense =>
      expense._id === expenseId ? { ...expense, ...newExpenseData } : expense
    );

    setExpenses(updatedExpenses);
  };

  const handleModify = async (event) => {
    const expenseId = event.currentTarget.dataset.id;
    const selectedExpense = expenses.find(object => {return object._id === expenseId});

    setFormData({
      expenseName: selectedExpense.expenseName,
      expenseAmount: selectedExpense.expenseAmount,
      expenseDate: convertIsoToDateString(selectedExpense.expenseDate),
      expenseCategory: selectedExpense.expenseCategory
    });

    setSelectedExpenseId(selectedExpense._id);
    setIsModifyModalVisible(true);
  }

  const handleSubmitModify = async () => {
    handleNameValidation();
    handleAmountValidation();
    handleDateValidation();
    handleCategoryValidation();
  
    if (isExpenseNameValid && isExpenseAmountValid && isExpenseDateValid && isExpenseCategoryValid) {
      const result = await modifyExpense(
        selectedExpenseId,
        formData.expenseName,
        formData.expenseAmount,
        convertDateStringToIso(formData.expenseDate),
        formData.expenseCategory
      );

      if (result) {
        updateExpense(selectedExpenseId, {
          expenseName: formData.expenseName,
          expenseAmount: formData.expenseAmount,
          expenseDate: convertDateStringToIso(formData.expenseDate),
          expenseCategory: formData.expenseCategory
        });

        setIsModifyModalVisible(false);

        setFormData({
          expenseName: "",
          expenseAmount: "",
          expenseDate: "",
          expenseCategory: ""
        });

        setIsExpenseNameValid(true);
        setIsExpenseAmountValid(true);
        setIsExpenseDateValid(true);
        setIsExpenseCategoryValid(true);
        setSelectedExpenseId("");
      }
    }
  };  

  const handleDelete = async (event) => {
    const expenseId = event.currentTarget.dataset.id;
    setSelectedExpenseId(expenseId);
    setIsDeleteModalVisible(true);
  }

  const handleSubmitDelete = async () => {
    const result = await deleteExpense(selectedExpenseId);
    
    if (result) {
      const updatedExpenses = expenses.filter(expense => expense._id !== selectedExpenseId);
      setExpenses(updatedExpenses);

      setIsDeleteModalVisible(false);
      setSelectedExpenseId("");
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
      ) : ( !expenses.length ? (
        <div className="error-message-container">
          <h1>Oups! Il semble que vous n'ayez pas ajouté de dépenses à cette catégorie.</h1>
          <p>Essayez de soumettre une nouvelle dépense et vous la trouverez ici, à votre retour.</p>
        </div>
      ) : (
        <Container>
          <Row className="d-flex justify-content-between align-items-center my-5">
            <Col xs="auto">
              <h2 style={{ marginBottom: 0 }}>Dépenses - {categoriesInFrench[sentenceCaseCategory]}</h2>
            </Col>
          </Row>

          <div className="expense-category-cards">
            {expenses.map((expense) => (
              <Card key={expense._id}>
                <Card.Body>
                  <Card.Title>{expense.expenseName}</Card.Title>
                  <Card.Subtitle className="text-muted">{convertIsoToDateString(expense.expenseDate)} – {expense.expenseAmount}DH</Card.Subtitle>
                </Card.Body>
                <Card.Body>
                  <Button variant="dark me-2" data-id={expense._id} onClick={handleModify}>Modifier</Button>
                  <Button variant="outline-dark" data-id={expense._id} onClick={handleDelete}>Supprimer</Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Modal show={isModifyModalVisible} onHide={handleModifyModalVisibility} animation={false} centered>
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
                <Button variant="dark" onClick={handleSubmitModify}>Soumettre</Button>
                <Button variant="outline-dark" onClick={handleModifyModalVisibility}>Annuler</Button>
              </Stack>
            </Modal.Body>
          </Modal>

          <Modal show={isDeleteModalVisible} onHide={handleDeleteModalVisibility} animation={false} centered>
            <Modal.Body>
              <h4 className="mb-0 mt-2">Supprimer la dépense</h4>
              <p className="mt-4" direction="horizontal">Êtes-vous sûr de vouloir supprimer cette dépense? Cette action n'est pas réversible.</p>
              <Stack gap={2} className="mx-auto mt-4" direction="horizontal">
                <Button variant="danger" onClick={handleSubmitDelete}>Supprimer</Button>
                <Button variant="outline-dark" onClick={handleDeleteModalVisibility}>Annuler</Button>
              </Stack>
            </Modal.Body>
          </Modal>
        </Container>
      )))}
    </>
  )
}

export default ViewCategoryExpenses;