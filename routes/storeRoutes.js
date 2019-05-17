const express = require('express');
const router = express.Router();
const {
    createOrder,
    findByOrderId,
    removeOrder,
    getInventory
} = require('../services/storeServices');



router.post('/order', createOrder);
router.get('/order/:id', findByOrderId);
router.delete('/order/:id', removeOrder);
router.get('/inventory', getInventory);



module.exports = router;