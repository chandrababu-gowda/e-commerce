const express = require("express");
const router = express.Router();
const {
  signupController,
  loginController,
  changePasswordController,
  logoutController,
} = require("../controllers/authentication");
const { authenticateToken } = require("../middleware/authenticate");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/changePassword", changePasswordController);
router.post("/logout", authenticateToken, logoutController);

module.exports = router;
