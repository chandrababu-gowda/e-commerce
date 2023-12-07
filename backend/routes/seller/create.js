const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const itemModel = require("../../schema/item");
const uuid = require("uuid");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
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
      res.status(400).json({ message: "Error in adding the item to database" });
    });
});

module.exports = router;
