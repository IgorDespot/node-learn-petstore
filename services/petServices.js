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
};


// GET PETS BY STATUS
// **
const getPetsByStatus = (req, res, next) => {
    logger.info(`GET fired: get pets by status. ${Date(Date.now())}`);

    Pet.find({
        status: req.params.status
    }, (err, pets) => {
        if (err) return res.status(500).send(err);
        else if (status === 'AVAILABLE') {
            return res.status(200).send(pets)
        } else if (status === 'PENDING') {
            return res.status(200).send(pets)
        } else if (status === 'SOLD') {
            return res.status(200).send(pets)
        } else return res.status(404).send('No pets with such status found');
    });
};


// finds one pet by its ID
const getPetById = (req, res, next) => {
    Pet.findById(req.params.id, (err, pet) => {
        if (err) res.send(err);
        else res.status(200).send(pet);
    });
};

const updatePetById = (req, res, next) => {
    Pet.findByIdAndUpdate(req.body.id, {
        category: req.body.category,
        name: req.name.name,
        photoUrls: req.body.photoUrls,
        tags: req.body.tags,
        status: req.body.status
    }, {
        new: true
    }, (err, pet) => {
        if (err) res.send(err);
        else res.status(200).send(pet);
    });
};

module.exports = {
    createPet,
    getPetById,
    updatePetById,
    getPetsByStatus
}