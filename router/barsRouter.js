const express = require("express");
const barsController = require("../controllers/barsController");
const router = express.Router();

router.get("/", barsController.getAllBars);

router.get("/:id", barsController.getBarById);

router.post("/", barsController.createBar);

router.put("/:id", barsController.updateBar);

router.delete("/:id", barsController.deleteBar);

module.exports = router;
