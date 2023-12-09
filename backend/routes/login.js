const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;
  const userType = req.body.userType;
  try {
    const user = await userModel.findOne({ username: enteredUsername });
    if (Boolean(user)) {
      if (await bcrypt.compare(enteredPassword, user.password)) {
        const personDetails = {
          username: enteredUsername,
          userType: userType,
        };

        const accessToken = jwt.sign(
          personDetails,
          process.env.ACCESS_TOKEN_SECRET
        );

        res.header("Authorization", `Bearer ${accessToken}`);
        res.status(200).json({ status: "200: OK", message: "User logged in" });
      }
    } else {
      res.status(400).json({
        status: "400: Bad Request",
        message: "User doesn't exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "500: Internal Server Error",
      message: "Unable to login due to server error",
    });
  }
});

module.exports = router;
