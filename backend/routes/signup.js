const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const profileModel = require("../models/profile");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    const enteredUsername = req.body.username;
    const userType = req.body.type;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const passwordsMatched = await bcrypt.compare(
      req.body.confirmPassword,
      hashedPassword
    );

    const userExists = Boolean(
      await userModel.findOne({ username: enteredUsername })
    );

    if (!userExists) {
      if (passwordsMatched) {
        userModel
          .create({
            username: enteredUsername,
            password: hashedPassword,
          })
          .catch((err) => {
            console.log(err);
          });

        profileModel
          .create({
            username: enteredUsername,
            cart: [],
          })
          .catch((err) => {
            console.log(err);
          });

        const personDetails = {
          username: enteredUsername,
          userType: userType,
        };

        const accessToken = jwt.sign(
          personDetails,
          process.env.ACCESS_TOKEN_SECRET
        );

        res.header("Authorization", `Bearer ${accessToken}`);
        res.status(201).json({ message: "User created" });
      } else {
        res.status(400).json({ message: "Passwords are not matching" });
      }
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
