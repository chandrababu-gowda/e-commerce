const express = require("express");
const router = express.Router();
const itemModel = require("../../schema/item");

const app = express();

router.post("/", async (req, res) => {
  const searchCondition = { uid: req.body.uid };
  try {
    await itemModel.findOneAndDelete(searchCondition);
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
