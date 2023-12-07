const express = require("express");
const router = express.Router();
const itemModel = require("../../schema/item");

const app = express();

router.post("/", async (req, res) => {
  const searchCondition = { uid: req.body.uid };
  const updateFields = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
  };

  try {
    const checkUpdation = await itemModel.findOneAndUpdate(
      searchCondition,
      updateFields
    );
    res.status(200).json({ message: "Item updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
