const express = require('express')
const router = express.Router();
const { createPet } = require('../services/petServices');


router.post('/', createPet);


module.exports = router;