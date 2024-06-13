const express = require('express');
const router = express.Router();
const biereController = require('../controllers/biereController');

// POST /bars/:id_bar/biere => Ajouter une bière à un bar
router.post('/bars/:id_bar/biere', biereController.addBiereToBar);

// PUT /biere/:id_biere => Modifier une bière
router.put('/biere/:id_biere', biereController.updateBiere);

// DELETE /biere/:id_biere => Supprimer une bière d'un bar
router.delete('/biere/:id_biere', biereController.deleteBiere);

// GET /bars/:id_bar/biere => Liste des bières d'un bar
router.get('/bars/:id_bar/biere', biereController.getBieresByBar);

// GET /biere/:id_biere => Détail d'une bière
router.get('/biere/:id_biere', biereController.getBiereById);

module.exports = router;

