const express = require("express");
const { generateSummary, generateContent } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate-summary", authMiddleware, generateSummary);
router.post("/generate-content", authMiddleware, generateContent);

module.exports = router;
