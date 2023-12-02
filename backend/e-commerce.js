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
