const itemModel = require("../models/item");

async function updateController(req, res) {
  if (req.user.userType == "seller") {
    const searchCondition = { uid: req.body.uid };
    const updateFields = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
    };

    try {
      await itemModel.findOneAndUpdate(searchCondition, updateFields);
      res.status(200).json({
        status: "200: OK",
        message: "Item updated",
      });
    } catch (err) {
      console.log(`Error in controllers/update.js \n ${err}`);
      res.status(500).json({
        status: "500: Internal Server Error",
        message: "Unable to update item in database",
      });
    }
  } else {
    res.status(401).json({
      status: "401: Unauthorized",
      message: "Unauthorized seller",
    });
  }
}

module.exports = { updateController };
