const express = require("express");
const barsController = require("../controllers/barsController");
const authenticate = require("../middleware/form");
const router = express.Router();

router.get("/", barsController.getAllBars);

router.get("/:id_bar", barsController.getBarById);

router.post("/", authenticate, barsController.createBar);

router.put("/:id_bar", authenticate, barsController.updateBar);

router.delete("/:id_bar", authenticate, barsController.deleteBar);

module.exports = router;
