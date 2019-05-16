const express = require('express')
const router = express.Router();
const { createPet, getPetById } = require('../services/petServices');


router.post('/', createPet);
router.get('/:id', getPetById);

module.exports = router;