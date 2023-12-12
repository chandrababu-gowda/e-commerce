const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Orders", orderSchema);
