const express = require("express");
const verifyToken = require("../middlewares/verifyTokenMiddleware.js");

const { register, login } = require("../controllers/authenticationController.js");

const router = express.Router();

router.post("/api/v1/register", register);
router.post("/api/v1/login", login);

module.exports = router;