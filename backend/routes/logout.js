const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticate");

const app = express();

router.post("/", authenticateToken, (req, res) => {
  res.removeHeader("Authorization");
  res.status(200).json({ status: "200: OK", messaage: "Log out" });
});

module.exports = router;
