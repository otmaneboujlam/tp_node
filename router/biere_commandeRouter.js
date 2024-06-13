const express = require('express');
const router = express.Router();
const biereCommandeController = require('../controllers/biere_commandeController');

router.post('/commandes/:id_commande/biere/:id_biere', biereCommandeController.addBiereToCommande);
router.delete('/commandes/:id_commande/biere/:id_biere', biereCommandeController.removeBiereFromCommande);

module.exports = router;