const itemModel = require("../models/item");

async function readController(req, res) {
  try {
    let allItems = await itemModel.find({}, "-_id -__v");
    res.status(200).json({
      status: "200: OK",
      message: "Fetched all the items",
      items: allItems,
    });
  } catch (err) {
    res.status(500).json({
      status: "500: Internal Server Error",
      message: "Unable to fetch the items",
    });
  }
}

module.exports = { readController };
