const express = require('express');
const router = express.Router();
const { createOrder } = require('../services/storeServices');

router.post('/', createOrder);

module.exports = router;
