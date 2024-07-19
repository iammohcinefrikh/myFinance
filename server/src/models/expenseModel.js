const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  expenseName: {
    type: String,
    required: true
  }, 
  expenseAmount: {
    type: Number,
    required: true
  },
  expenseDate: {
    type: Date,
    required: true
  },
  expenseCategory: {
    type: String,
    required: true
  }
}, { collection: "expense" });

module.exports = mongoose.model("Expense", expenseSchema);