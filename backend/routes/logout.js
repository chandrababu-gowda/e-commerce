const express = require("express");
const router = express.Router();

const app = express();

router.post("/", (req, res) => {
  res.removeHeader("Authorization");
  res.status(200).json({ messaage: "Log out" });
});

module.exports = router;
