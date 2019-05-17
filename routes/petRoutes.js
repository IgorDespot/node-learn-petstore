const express = require('express')
const router = express.Router();
const {
    createPet,
    getPetById,
    getPetsByStatus,
    updatePetById,
    deletePet,
    updatePetByFormDataViaPost,
    updatePetImgUrl
} = require('../services/petServices');

router.post('/', createPet);
router.get('/:id', getPetById);
router.get('/status/:status', getPetsByStatus);
router.put('/', updatePetById);
router.delete('/:id', deletePet);
router.post('/:id', updatePetByFormDataViaPost);
router.post('/:id/uploadImage', updatePetImgUrl);

module.exports = router;