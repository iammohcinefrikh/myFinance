const mongoose = require("mongoose");

async function connectToDB() {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;

  try {
      await mongoose.connect(connectionString);
      console.log("Connected to MongoDB database.");
  } 

  catch (error) {
      console.log("Error connecting to MongoDB: ", error);
  }
}

module.exports = connectToDB;