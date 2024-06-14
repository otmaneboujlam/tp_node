const { BiereCommande } = require("../models/models");

const addBiereToCommande = async (req, res) => {
  try {
    const idBiere = parseInt(req.params.id_biere, 10);
    const idCommande = parseInt(req.params.id_commande, 10);

    if (!Number.isInteger(idBiere) || !Number.isInteger(idCommande)) {
      return res
        .status(400)
        .json({ error: "Incorrect, les ids doivent être des nombres." });
    }

    const biereCommande = await BiereCommande.create({
      biere_id: idBiere,
      commande_id: idCommande,
    });
    res.status(201).json(biereCommande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeBiereFromCommande = async (req, res) => {
  try {
    const idBiere = parseInt(req.params.id_biere, 10);
    const idCommande = parseInt(req.params.id_commande, 10);

    if (!Number.isInteger(idBiere) || !Number.isInteger(idCommande)) {
      return res
        .status(400)
        .json({ error: "Incorrect, les ids doivent être des nombres." });
    }

    await BiereCommande.destroy({
      where: {
        biere_id: idBiere,
        commande_id: idCommande,
      },
    });
    res.status(200).send({ message: "Suppression effectuée !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addBiereToCommande,
  removeBiereFromCommande,
};
