const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/databaseConfig");
require("dotenv").config();

const authenticationRoutes = require("./routes/authenticationRouter");
const expenseRoutes = require("./routes/expenseRouter");
const newsletterRoutes = require("./routes/newsletterRouter");
const profileRoutes = require("./routes/profileRouter");
const verificationRoute = require("./routes/verificationRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(authenticationRoutes);
app.use(expenseRoutes);
app.use(newsletterRoutes);
app.use(profileRoutes);
app.use(verificationRoute);

async function startServer() {
  try {
    await connectToDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log("Server Listening on port: ", PORT);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

startServer();