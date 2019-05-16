const express = require('express')
const router = express.Router();
const {
    createPet,
    getPetById,
    getPetsByStatus,
    updatePetById,
    deletePet
} = require('../services/petServices');

router.post('/', createPet);
router.get('/:id', getPetById);
router.get('/getPetsByStatus/:status', getPetsByStatus);
router.put('/', updatePetById);
router.delete('/:id', deletePet);

module.exports = router;