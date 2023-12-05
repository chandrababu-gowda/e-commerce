const mongoose = require("mongoose");

const itemDesc = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Items", itemDesc);
