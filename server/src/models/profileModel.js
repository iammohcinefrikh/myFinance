const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },
  profileMonthlyBudget: {
    type: Number
  },
  profileUtilitiesBudget: {
    type: Number
  },
  profileGroceriesBudget: {
    type: Number
  },
  profileHousingBudget: {
    type: Number
  },
  profileTransportBudget: {
    type: Number
  },
  profileHealthBudget: {
    type: Number
  },
  profileEducationBudget: {
    type: Number
  },
  profileHobbiesBudget: {
    type: Number
  },
  profileSavingsBudget: {
    type: Number
  },
  profileMiscellaneousBudget: {
    type: Number
  }
}, { collection: "profile" });

module.exports = mongoose.model("Profile", profileSchema);