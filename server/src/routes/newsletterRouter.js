const express = require("express");
const verifyToken = require("../middlewares/verifyTokenMiddleware");

const { subscribe, unsubscribe } = require("../controllers/newsletterController");

const router = express.Router();

router.post("/api/v1/subscribe", verifyToken, subscribe);
router.post("/api/v1/unsubscribe", verifyToken, unsubscribe);

module.exports = router;