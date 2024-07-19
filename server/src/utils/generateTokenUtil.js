const jwt = require("jsonwebtoken");

const generateToken = (userEmail, jwtSecret ) => {
  const jwtToken = jwt.sign({ email: userEmail }, jwtSecret, { expiresIn: "1h" });
  return jwtToken;
}

module.exports = generateToken;