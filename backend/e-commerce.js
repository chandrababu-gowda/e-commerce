require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

const signupRouter = require("./routes/signup");
app.use("/signup", signupRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const changePasswordRouter = require("./routes/changePassword");
app.use("/changePassword", changePasswordRouter);

const createRouter = require("./routes/seller/create");
app.use("/create", createRouter);

const readRouter = require("./routes/read");
app.use("/read", readRouter);

const updateRouter = require("./routes/seller/update");
app.use("/update", updateRouter);

const deleteRouter = require("./routes/seller/delete");
app.use("/delete", deleteRouter);
