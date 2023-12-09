const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const { createController } = require("../controllers/create");
const { deleteController } = require("../controllers/delete");
const { readController } = require("../controllers/read");
const { updateController } = require("../controllers/update");
const router = express.Router();

router.get("/", authenticateToken, readController);
router.post("/", authenticateToken, createController);
router.delete("/:uid", authenticateToken, deleteController);
router.put("/", authenticateToken, updateController);

module.exports = router;
