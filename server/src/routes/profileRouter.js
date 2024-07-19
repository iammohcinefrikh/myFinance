const express = require("express");
const verifyToken = require("../middlewares/verifyTokenMiddleware");

const { getProfile, updateProfile } = require("../controllers/profileController");

const router = express.Router();

router.get("/api/v1/profile", verifyToken, getProfile);
router.put("/api/v1/profile", verifyToken, updateProfile);

module.exports = router;