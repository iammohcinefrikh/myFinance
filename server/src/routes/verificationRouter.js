const express = require("express");
const handleResponse = require("../helpers/handleResponseHelper");
const verifyToken = require("../middlewares/verifyTokenMiddleware");

const router = express.Router();

router.get("/api/v1/verify", verifyToken, async (request, response) => {
  handleResponse(response, 200, "success", "OK", "Jeton est valide");
});

module.exports = router;