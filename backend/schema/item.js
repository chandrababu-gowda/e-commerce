const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Items", itemSchema);
