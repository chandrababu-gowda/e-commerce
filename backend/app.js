const express = require("express");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

// Custom 404 page
app.use((req, res) => {
  res
    .status(404)
    .json({ status: "404: Not Found", message: "Unable to find the page" });
});

// Custom 500 page
app.use((err, req, res, next) => {
  console.log(err.stack);
  res
    .status(500)
    .json({ status: "500: Internal Server Error", message: "Error in server" });
});

module.exports = app;
