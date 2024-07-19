const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userFirstName: {
    type: String,
    required: true
  },
  userLastName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  isSubscribed: {
    type: Boolean,
    required: true
  }
}, { collection: "user" });

module.exports = mongoose.model("User", userSchema);