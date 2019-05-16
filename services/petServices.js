const Pet = require('../models/Pet');
//const logger = require('../../util/logger');

const createPet = (req, res,next) => {

    newPet = new Pet(req.body);

    newPet.save().then(pet => {
       //logger.info( 'New pet is saved.');
       res.status(200).send(pet);
    }).catch((err) => {
       res.status(405).send('Invalid input');
       //logger.error('Invalid input');
    })
}

module.exports = {
    createPet
}