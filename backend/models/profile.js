const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  cart: [String],
});

module.exports = mongoose.model("Profiles", profileSchema);
