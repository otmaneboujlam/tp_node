const { Commande } = require("../models/models");

const createCommande = async (req, res) => {
  try {
    const commande = await Commande.create({
      ...req.body,
      bars_id: req.params.id_bar,
    });
    res.status(201).json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCommande = async (req, res) => {
  try {
    const commande = await Commande.update(req.body, {
      where: { id: req.params.id_commande },
    });
    res.status(200).json({ message: "La commande a bien été modifiée !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommande = async (req, res) => {
  try {
    await Commande.destroy({ where: { id: req.params.id_commande } });
    res.status(204).send({ message: "La commande a bien été supprimée !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      where: { bars_id: req.params.id_bar },
    });
    res.status(200).json(commandes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommande = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (commande) {
      res.status(200).json(commande);
    } else {
      res.status(404).json({ error: "La commande est introuvable" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommande,
  updateCommande,
  deleteCommande,
  listCommandes,
  getCommande,
};
