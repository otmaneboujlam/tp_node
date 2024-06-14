const express = require("express");
const barsController = require("../controllers/barsController");
const authenticate = require('../middleware/form');
const router = express.Router();

// Endpoints généraux
router.get("/", barsController.getAllBars);
router.get("/:id", barsController.getBarById);
router.post("/", authenticate, barsController.createBar);
router.put("/:id", authenticate, barsController.updateBar);
router.delete("/:id", authenticate, barsController.deleteBar);

// Endpoints avancés
router.get("/:id/commandes", barsController.getCommandes);
router.get("/:id/degree", barsController.getDegree);
router.get("/search", barsController.searchBars);

module.exports = router;
