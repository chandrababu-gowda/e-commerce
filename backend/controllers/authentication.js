const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const profileModel = require("../models/profile");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Signup
async function signupController(req, res) {
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
            console.log(`Error in controllers/authentication.js \n ${err}`);
          });

        profileModel
          .create({
            username: enteredUsername,
            cart: [],
          })
          .catch((err) => {
            console.log(`Error in controllers/authentication.js \n ${err}`);
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
    console.log(`Error in controllers/authentication.js \n ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Login
async function loginController(req, res) {
  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;
  const userType = req.body.userType;
  try {
    const user = await userModel.findOne({ username: enteredUsername });
    if (Boolean(user)) {
      const checkPassword = await bcrypt.compare(
        enteredPassword,
        user.password
      );
      if (checkPassword) {
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
      } else {
        res.status(400).json({
          status: "400: Bad Request",
          message: "Invalid Password",
        });
      }
    } else {
      res.status(400).json({
        status: "400: Bad Request",
        message: "User doesn't exist",
      });
    }
  } catch (err) {
    console.log(`Error in controllers/authentication.js \n ${err}`);
    res.status(500).json({
      status: "500: Internal Server Error",
      message: "Unable to login due to server error",
    });
  }
}

// Change password
async function changePasswordController(req, res) {
  try {
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(enteredPassword, 10);
    const passwordsMatched = await bcrypt.compare(
      req.body.confirmPassword,
      hashedPassword
    );
    const userExists = await userModel.findOne({ username: enteredUsername });

    if (Boolean(userExists)) {
      if (passwordsMatched) {
        const searchCondition = { username: enteredUsername };
        const updateCondition = { password: hashedPassword };
        await userModel.findOneAndUpdate(searchCondition, updateCondition);
        res.status(200).json({
          status: "200: OK",
          message: "Details updated",
        });
      } else {
        res.status(400).json({
          status: "400: Bad Request",
          message: "Password aren't matching",
        });
      }
    } else {
      res.status(400).json({
        status: "400: Bad Request",
        message: "User doesn't exists",
      });
    }
  } catch (err) {
    console.log(`Error in controllers/authentication.js \n ${err}`);
    res.status(500).json({
      status: "500: Internal Server Error",
      message: "Unable to update item in database",
    });
  }
}

// Logout
function logoutController(req, res) {
  res.removeHeader("Authorization");
  res.status(200).json({ status: "200: OK", messaage: "Log out" });
}

module.exports = {
  signupController,
  loginController,
  changePasswordController,
  logoutController,
};
