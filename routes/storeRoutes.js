const express = require('express');
const router = express.Router();
const { createOrder, findByOrderId } = require('../services/storeServices');

router.post('/order', createOrder);
router.get('/order/:id', findByOrderId);

module.exports = router;
