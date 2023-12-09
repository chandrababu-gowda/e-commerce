const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const itemModel = require("../models/item");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

function createController(req, res) {
  if (req.user.userType == "seller") {
    itemModel
      .create({
        uid: uuid.v1(),
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
      })
      .then(() => {
        res.status(201).json({
          status: "201: Created",
          message: "Item added to database",
        });
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        res.status(500).json({
          status: "500: Internal Server Error",
          message: "Unable to add item to database",
        });
      });
  } else {
    res.status(401).json({
      status: "401: Unauthorized",
      message: "Unauthorized seller",
    });
  }
}

module.exports = { createController };
