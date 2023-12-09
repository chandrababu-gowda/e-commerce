const itemModel = require("../models/item");

async function readController(req, res) {
  try {
    let allItemsArray = await itemModel.find({}, "-_id -__v");
    res.status(201).json(allItemsArray);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { readController };
