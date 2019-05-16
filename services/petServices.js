const Pet = require('../models/Pet');
//const logger = require('../../util/logger');

const createPet = (req, res, next) => {

    newPet = new Pet(req.body);

    newPet.save().then(pet => {
        //logger.info( 'New pet is saved.');
        res.status(200).send(pet);
    }).catch((err) => {
        res.status(405).send('Invalid input');
        //logger.error('Invalid input');
    })
}

// finds one pet by its ID
const getPetById = (req, res, next) => {
    Pet.findById(req.params.id, (err, pet) => {
        if (err) res.send(err);
        else res.status(200).send(pet);
    });
}

module.exports = {
    createPet,
    getPetById
}