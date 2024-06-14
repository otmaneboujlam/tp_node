const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.post('/bars/:id_bar', commandeController.createCommande);

router.put('/:id_commande', commandeController.updateCommande);

router.delete('/:id_commande', commandeController.deleteCommande);

router.get('/bars/:id_bar', commandeController.listCommandes);

router.get('/:id', commandeController.getCommande);

module.exports = router;