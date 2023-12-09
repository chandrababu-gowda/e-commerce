const express = require("express");
const router = express.Router();
const itemModel = require("../../schema/item");
const { authenticateToken } = require("../../middleware/authenticate");

const app = express();

router.post("/", authenticateToken, async (req, res) => {
  if (req.user.userType) {
    const searchCondition = { uid: req.body.uid };
    const updateFields = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
    };

    try {
      await itemModel.findOneAndUpdate(searchCondition, updateFields);
      res.status(200).json({ message: "Item updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Unauthorized seller" });
  }
});

module.exports = router;
