const { Op } = require('sequelize');
const Biere = require('../models/biere');

// POST /bars/:id_bar/biere => Ajouter une bière à un bar
exports.addBiereToBar = async (req, res) => {
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
};

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

// GET /bars/:id_bar/biere => Liste des bières d'un bar
exports.getBieresByBar = async (req, res) => {
    try {
        const { id_bar } = req.params;
        const { sort = 'asc', limit = 10, offset = 0, degree_min, degree_max } = req.query;

        const whereClause = { bars_id: id_bar };
        console.log(degree_max);
        if (degree_min || degree_max) {
            whereClause.degree = {};
            if (degree_min) whereClause.degree[Op.gte] = degree_min;
            if (degree_max) whereClause.degree[Op.lte] = degree_max;
        }

        const bieres = await Biere.findAll({
            where: whereClause,
            order: [['name', sort]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.status(200).json(bieres);
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
