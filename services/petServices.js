const Pet = require('../models/Pet');

const createPet = (req, res, next) => {

    let newPet = new Pet(req.body);

    newPet.save().then(pet => {
       res.status(200).send(pet);
    }).catch((err) => {
       res.status(405).send('Invalid input.' + err);
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

// update pet by ID
const updatePetById = (req, res, next) => {
    Pet.findByIdAndUpdate(req.body.id, {
        category: req.body.category,
        name: req.body.name,
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

// updates pets name and/or staus via post request and from data
const updatePetByFormDataViaPost = (req, res, next) => {
    Pet.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        status: req.body.status
    }, {
        new: true
    }, (err, pet) => {
        if (err) res.send(err);
        else res.status(200).send(pet);
    });
};

const deletePet = (req,res,next) => {
    
    let petId = req.params.id;

    Pet.remove({_id: petId})
    .then(pet => {
        if(pet){
            res.status(200).send(pet)
        }else{
            res.status(404).send(`Can not find with id ${id}.`)
        }
    })
    .catch((err) => {
       res.status(400).send(`Invalid ID supplied.`);
    })    
}

module.exports = {
    createPet,
    getPetById,
    updatePetById,
    getPetsByStatus,
    deletePet,
    updatePetByFormDataViaPost
}