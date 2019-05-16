const express = require('express')
const router = express.Router();
const {
    createPet,
    getPetById,
    getPetsByStatus,
    updatePetById,
    deletePet,
    updatePetByFormDataViaPost
} = require('../services/petServices');

router.post('/', createPet);
router.get('/:id', getPetById);
router.get('/status/:status', getPetsByStatus);
router.put('/', updatePetById);
router.delete('/:id', deletePet);
router.post('/:id', updatePetByFormDataViaPost);

module.exports = router;