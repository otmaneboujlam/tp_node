const express = require("express");
const router = express.Router();
const biereController = require("../controllers/biereController");

router.post("/bars/:id_bar", biereController.addBiereToBar);

router.put("/:id_biere", biereController.updateBiere);

router.delete("/:id_biere", biereController.deleteBiere);

router.get("/bars/:id_bar", biereController.getBieresByBar);

router.get("/:id_biere", biereController.getBiereById);

module.exports = router;
