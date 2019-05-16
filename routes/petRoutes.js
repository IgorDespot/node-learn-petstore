const express = require('express')
const router = express.Router();
const {
    createPet,
    getPetById,
    getPetsByStatus
} = require('../services/petServices');



router.post('/', createPet);
router.get('/:id', getPetById);
router.get('/getPetsByStatus/:status', getPetsByStatus);



module.exports = router;