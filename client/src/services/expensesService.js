import axios from "axios";

const addExpense = async (expenseName, expenseAmount, expenseDate, expenseCategory) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/expense", {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDate: expenseDate,
      expenseCategory: expenseCategory
    });

    if (response?.data?.statusCode === 201) {
      return {
        "status": true,
        "expense": response?.data?.expense
      };
    }
  }

  catch (error) {
    if (!error?.response) {
      alert("Aucune réponse n'est reçue du serveur");
    }
    
    else {
      alert(error?.response?.data?.message);
    }

    return false;
  }
}

const getExpenses = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/expenses");

    if (response?.data?.statusCode === 200) {
      return response?.data;
    }
  }
  
  catch (error) {
    if (!error?.response) {
      alert("Aucune réponse n'est reçue du serveur");
    }

    else {
      alert(error?.response?.data?.message);
    }
  }
}

const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete("http://localhost:8080/api/v1/expense", {
      data: { expenseId: expenseId }
    });

    if (response?.data?.statusCode === 201) {
      return true;
    }
  }
  
  catch (error) {
    if (!error?.response) {
      alert("Aucune réponse n'est reçue du serveur");
    }
    
    else {
      alert(error?.response?.data?.message);
    }

    return false;
  }
};

const modifyExpense = async (expenseId, expenseName, expenseAmount, expenseDate, expenseCategory) => {
  try {
    const response = await axios.put("http://localhost:8080/api/v1/expense", {
      expenseId: expenseId,
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDate: expenseDate,
      expenseCategory: expenseCategory
    });

    if (response?.data?.statusCode === 201) {
      return true;
    }
  }

  catch (error) {
    if (!error?.response) {
      alert("Aucune réponse n'est reçue du serveur");
    }
    
    else {
      alert(error?.response?.data?.message);
    }

    return false;
  }
}

export { addExpense, getExpenses, deleteExpense, modifyExpense };