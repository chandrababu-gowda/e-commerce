const express = require("express");
const bodyParser = require("body-parser");
const orderModel = require("../models/order");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

function handleOrderCreation(req, res) {
  if (req.user.userType == "buyer") {
    orderModel
      .create({
        uid: req.body.uid,
        name: req.user.username,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        price: req.body.price,
      })
      .then(() => {
        res
          .status(200)
          .json({ status: "200: OK", message: "Order placed successfully" });
      })
      .catch((err) => {
        console.log(`Error in controllers/order.js \n ${err}`);
        res.status(500).json({
          status: "500: Internal Server Error",
          message: "Unable to place order",
        });
      });
  } else {
    res.status(401).json({
      status: "401: Unauthorized",
      message: "Unauthorized buyer",
    });
  }
}

async function handleOrderRead(req, res) {
  try {
    const allOrder = await orderModel.find({}, "-_id -__v");
    res.status(200).json({
      status: "200: OK",
      message: "Fetched all orders",
      orders: allOrder,
    });
  } catch (err) {
    console.log(`Error in controllers/order.js \n ${err}`);
    res.status(500).json({
      status: "500: Internal Server Error",
      message: "Unable to fetch the orders",
    });
  }
}

module.exports = { handleOrderCreation, handleOrderRead };
