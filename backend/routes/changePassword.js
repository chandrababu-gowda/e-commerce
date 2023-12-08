const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../schema/user");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
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
        userModel.findOneAndUpdate(searchCondition, updateCondition);
        res.status(200).json({ message: "Details updated" });
      } else {
        res.status(400).json({ message: "Password aren't matching" });
      }
    } else {
      res.status(400).json({ message: "User doesn't exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
