const express = require('express');
const router = express.Router();
const Biere = require('../models/biere');


// POST /bars/:id_bar/biere => Ajouter une bière à un bar
router.post('/bars/:id_bar/biere', async (req, res) => {
  try {
    const { id_bar } = req.params;
    const { name, description, degree, prix } = req.body;

    const newBiere = await Biere.create({
      name,
      description,
      degree,
      prix,
      bars_id: id_bar,
    });

    res.status(201).json(newBiere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /biere/:id_biere => Modifier une bière
router.put('/biere/:id_biere', async (req, res) => {
  try {
    const { id_biere } = req.params;
    const { name, description, degree, prix, bars_id } = req.body;

    const biere = await Biere.findByPk(id_biere);
    if (!biere) {
      return res.status(404).json({ error: 'Biere not found' });
    }

    biere.name = name;
    biere.description = description;
    biere.degree = degree;
    biere.prix = prix;
    biere.bars_id = bars_id;

    await biere.save();
    res.status(200).json(biere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /biere/:id_biere => Supprimer une bière d'un bar
router.delete('/biere/:id_biere', async (req, res) => {
  try {
    const { id_biere } = req.params;

    const biere = await Biere.findByPk(id_biere);
    if (!biere) {
      return res.status(404).json({ error: 'Biere not found' });
    }

    await biere.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /bars/:id_bar/biere => Liste des bières d'un bar
router.get('/bars/:id_bar/biere', async (req, res) => {
  try {
    const { id_bar } = req.params;

    const bieres = await Biere.findAll({
      where: {
        bars_id: id_bar,
      },
    });

    res.status(200).json(bieres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /biere/:id_biere => Détail d'une bière
router.get('/biere/:id_biere', async (req, res) => {
  try {
    const { id_biere } = req.params;

    const biere = await Biere.findByPk(id_biere);
    if (!biere) {
      return res.status(404).json({ error: 'Biere not found' });
    }

    res.status(200).json(biere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;