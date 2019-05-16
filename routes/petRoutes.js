const express = require('express')
const router = express.Router();
const {
    createPet,
    getPetById,
    getPetsByStatus,
    updatePetById
} = require('../services/petServices');

router.post('/', createPet);
router.get('/:id', getPetById);
router.get('/getPetsByStatus/:status', getPetsByStatus);
router.put('/:id', updatePetById);

module.exports = router;