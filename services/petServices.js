const Pet = require('../models/Pet');
const logger = require('../util/logger');

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

    let status = req.params.status;

    if (status == 'available') {
        Pet.find({
            "status": "AVAILABLE"
        }, (err, pets) => {
            if (err) return res.status(500).send("There was a problem finding the pets.");
            res.status(200).send(pets);
        });
    } else if (status == 'pending') {
        Pet.find({
            "status": "PENDING"
        }, (err, pets) => {
            if (err) return res.status(500).send("There was a problem finding the pets.");
            res.status(200).send(pets);
        });
    } else if (status == 'sold') {
        Pet.find({
            "status": "SOLD"
        }, (err, pets) => {
            if (err) return res.status(500).send("There was a problem finding the pets.");
            res.status(200).send(pets);
        });
    } else {
        return res.status(404).send("No pets with such status found... Available statuses: 'available', 'pending' and 'sold' ");
    }
};


// finds one pet by its ID
const getPetById = (req, res, next) => {
    Pet.findById(req.params.id, (err, pet) => {
        if (err) res.send(err);
        else res.status(200).send(pet);
    });
};



module.exports = {
    createPet,
    getPetsByStatus,
    getPetById
}