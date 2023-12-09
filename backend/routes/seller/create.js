const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const router = express.Router();
const itemModel = require("../../schema/item");
const { authenticateToken } = require("../../middleware/authenticate");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", authenticateToken, (req, res) => {
  if (req.user.userType == "seller") {
    itemModel
      .create({
        uid: uuid.v1(),
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
      })
      .then(() => {
        console.log(`Successfully added to database`);
        res.status(201).json({ message: "Item added to database" });
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        res
          .status(400)
          .json({ message: "Error in adding the item to database" });
      });
  } else {
    res.status(400).json({ message: "Unauthorized seller" });
  }
});

module.exports = router;
