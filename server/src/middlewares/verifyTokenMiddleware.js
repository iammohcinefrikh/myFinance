const jwt = require("jsonwebtoken");
const handleResponse = require("../helpers/handleResponseHelper");

function verifyToken(request, response, next) {
  const token = request.header("x-auth-token");

  if (!token) {
    return handleResponse(response, 401, "error", "Unauthorized", "Jeton non fourni");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  }
  
  catch (error) {
    handleResponse(response, 401, "error", "Unauthorized", "Jeton n'est pas valide");
  }
}

module.exports = verifyToken;