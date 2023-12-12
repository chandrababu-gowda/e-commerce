const express = require("express");
const {
  handleOrderCreation,
  handleOrderRead,
} = require("../controllers/order");
const { authenticateToken } = require("../middleware/authenticate");
const router = express.Router();

router.post("/", authenticateToken, handleOrderCreation);
router.get("/", handleOrderRead);

module.exports = router;
