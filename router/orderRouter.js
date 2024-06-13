const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/bars/:id_bar/commandes', orderController.addOrderToBar);

router.put('/commandes/:id_order', orderController.updateOrder);

router.delete('/commandes/:id_order', orderController.deleteOrder);

router.get('/bars/:id_bar/commandes', orderController.getOrdersByBar);

router.get('/commandes/:id_order', orderController.getOrderById);

module.exports = router;