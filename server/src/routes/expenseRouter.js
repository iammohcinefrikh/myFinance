const express = require("express");
const verifyToken = require("../middlewares/verifyTokenMiddleware");

const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController");

const router = express.Router();

router.post("/api/v1/expense", verifyToken, addExpense);
router.get("/api/v1/expenses", verifyToken, getExpenses);
router.put("/api/v1/expense", verifyToken, updateExpense);
router.delete("/api/v1/expense", verifyToken, deleteExpense);

module.exports = router;