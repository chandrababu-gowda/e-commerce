const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(400).json({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userDetails) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error in authenticating the token" });
    }
    req.user = userDetails;
    next();
  });
}

module.exports = { authenticateToken };
