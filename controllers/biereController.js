const { Op } = require("sequelize");
const Biere = require("../models/biere");

const addBiereToBar = async (req, res) => {
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

const updateBiere = async (req, res) => {
  try {
    const { id_biere } = req.params;
    const { name, description, degree, prix, bars_id } = req.body;

    const biere = await Biere.findByPk(id_biere);
    if (!biere) {
      return res.status(404).json({ error: "Biere introuvable" });
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

const deleteBiere = async (req, res) => {
  try {
    const { id_biere } = req.params;

    const biere = await Biere.findByPk(id_biere);
    if (!biere) {
      return res.status(404).json({ error: "Biere introuvable" });
    }

    await biere.destroy();
    res.status(204).send({ message: "La bière a bien été supprimée !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBieresByBar = async (req, res) => {
  try {
    const { id_bar } = req.params;
    const {
      sort = "asc",
      limit = 10,
      offset = 0,
      degree_min,
      degree_max,
    } = req.query;

    const whereClause = { bars_id: id_bar };

    if (degree_min || degree_max) {
      whereClause.degree = {};
      if (degree_min) whereClause.degree[Op.gte] = degree_min;
      if (degree_max) whereClause.degree[Op.lte] = degree_max;
    }

    const bieres = await Biere.findAll({
      where: whereClause,
      order: [["name", sort]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json(bieres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBiereById = async (req, res) => {
  try {
    const { id_biere } = req.params;

    const biere = await Biere.findByPk(id_biere);
    if (!biere) {
      return res.status(404).json({ error: "Biere introuvable" });
    }

    res.status(200).json(biere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBieresByBar,
  getBiereById,
  deleteBiere,
  addBiereToBar,
  updateBiere,
};
