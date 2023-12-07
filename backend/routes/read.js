const express = require("express");
const router = express.Router();
const itemModel = require("../schema/item");

router.get("/", async (req, res) => {
  try {
    let allItemsArray = await itemModel.find({}, "-_id -__v");
    res.status(201).json(allItemsArray);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
