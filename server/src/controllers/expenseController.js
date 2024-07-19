const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const addExpenseSchema = require("../schemas/addExpenseSchema");
const handleResponse = require("../helpers/handleResponseHelper");

const addExpense = async (request, response) => {
  try {
    const { expenseName, expenseAmount, expenseDate, expenseCategory } = request.body;
    const userEmail = request.user.email;

    const { error } = addExpenseSchema.validate({ expenseName: expenseName, expenseAmount: expenseAmount, expenseDate: expenseDate, expenseCategory: expenseCategory });

    if (error) {
      return handleResponse(response, 400, "error", "Bad Request", error.details[0].message);
    }

    const existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    else {
      const newExpense = new Expense({
        userId: existingUser._id,
        expenseName: expenseName,
        expenseAmount: expenseAmount,
        expenseDate: expenseDate,
        expenseCategory: expenseCategory
      });
  
      const savedExpense = await newExpense.save();

      const formattedExpense = {
        _id: savedExpense._id.toString(),
        userId: savedExpense.userId.toString(),
        expenseName: savedExpense.expenseName,
        expenseAmount: savedExpense.expenseAmount,
        expenseDate: savedExpense.expenseDate.toISOString(),
        expenseCategory: savedExpense.expenseCategory,
        __v: savedExpense.__v
      };

      response.status(201).json({
        "statusCode": 201,
        "success": "OK",
        "message": "L'enregistrement de la dépense a été créé avec succès",
        "expense": formattedExpense
      });
    }
  }

  catch (error) {
    console.error(error);
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de l'enregistrement de la dépense");
  }
}

const getExpenses = async (request, response) => {
  try {
    const userEmail = request.user.email;
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    else {
      const expenses = await Expense.find({
        expenseDate: {
          $gte: startOfMonth,
          $lte: endOfMonth
        },
        userId: existingUser._id
      });

      response.status(200).json({
        "statusCode": 200,
        "success": "OK",
        "message": "Dépenses récupérées avec succès",
        "expenses": expenses
      });
    }
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la recherche des dépenses");
  }
}

const updateExpense = async (request, response) => {
  try {
    const { expenseId, expenseName, expenseAmount, expenseDate, expenseCategory } = request.body;

    const { error } = addExpenseSchema.validate({ expenseName: expenseName, expenseAmount: expenseAmount, expenseDate: expenseDate, expenseCategory: expenseCategory });

    if (error) {
      return handleResponse(response, 400, "error", "Bad Request", error.details[0].message);
    }

    const existingExpense = await Expense.findOne({ _id: expenseId });

    if (!existingExpense) {
      return handleResponse(response, 404, "error", "Not Found", "Dépense non trouvée");
    }

    const expenseData = {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDate: expenseDate,
      expenseCategory: expenseCategory
    }

    await Expense.findByIdAndUpdate(expenseId, expenseData);

    handleResponse(response, 201, "success", "Created", "La dépense a été mise à jour avec succès");
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la mise à jour de la dépense");
  }
}

const deleteExpense = async (request, response) => {
  try {
    const { expenseId } = request.body;

    const existingExpense = await Expense.findOne({ _id: expenseId });

    if (!existingExpense) {
      return handleResponse(response, 404, "error", "Not Found", "Dépense non trouvée");
    }

    await Expense.findByIdAndDelete({ _id: expenseId });

    handleResponse(response, 201, "success", "Created", "La dépense a été supprimée avec succès");
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la suppression de la dépense");
  }
}

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };