const express = require("express");
const router = express.Router();
const Bar = require("../models/bars");

// Ajouter un bar
router.post("/bars", async (req, res) => {});

// Modifier un bar
router.put("/bars/:id", async (req, res) => {});

// Supprimer un bar
router.delete("/bars/:id", async (req, res) => {});

// Récupérer tous les bars
router.get("/bars", async (req, res) => {});

// Récupérer un bar
router.get("/bars/:id", async (req, res) => {});

module.exports = router;
