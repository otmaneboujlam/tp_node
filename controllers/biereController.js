const { Op } = require('sequelize');
const Biere = require('../models/biere');


// PUT /biere/:id_biere => Modifier une bière
exports.updateBiere = async (req, res) => {
    try {
        const { id_biere } = req.params;
        const { name, description, degree, prix, bars_id } = req.body;

        const biere = await Biere.findByPk(id_biere);
        if (!biere) {
            return res.status(404).json({ error: 'Biere introuvable' });
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
};

// DELETE /biere/:id_biere => Supprimer une bière d'un bar
exports.deleteBiere = async (req, res) => {
    try {
        const { id_biere } = req.params;

        const biere = await Biere.findByPk(id_biere);
        if (!biere) {
            return res.status(404).json({ error: 'Biere introuvable' });
        }

        await biere.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// GET /biere/:id_biere => Détail d'une bière
exports.getBiereById = async (req, res) => {
    try {
        const { id_biere } = req.params;

        const biere = await Biere.findByPk(id_biere);
        if (!biere) {
            return res.status(404).json({ error: 'Biere introuvable' });
        }

        res.status(200).json(biere);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
