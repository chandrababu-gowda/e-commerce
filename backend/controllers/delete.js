const itemModel = require("../models/item");

async function deleteController(req, res) {
  if (req.user.userType == "seller") {
    const searchCondition = { uid: req.params.uid };
    try {
      await itemModel.findOneAndDelete(searchCondition);
      res.status(200).json({
        status: "200: OK",
        message: "Item deleted",
      });
    } catch (err) {
      console.log(`Error in controllers/delete.js \n ${err}`);
      res.status(500).json({
        status: "500: Internal Server Error",
        message: "Unable to delete item from database",
      });
    }
  } else {
    res.status(401).json({
      status: "401: Unauthorized",
      message: "Unauthorized seller",
    });
  }
}

module.exports = { deleteController };
