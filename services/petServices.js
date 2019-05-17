const Pet = require('../models/Pet');
const logger = require('../util/logger');
const js2xmlparser = require("js2xmlparser");

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
        else  res.status(200).send(pet)
    });
};

/******* get pet by ID and return it in XML format ********/
const getPetByIdXmlForm = (req, res, next) => {
    Pet.findById(req.params.id, (err, pet) => {
        if (err) res.send(err);
        else {
            let xmlPet = {
                category: `${pet.category.name}`,
                name: `${pet.name}`,
                status:`${pet.status}`,
                tags:`${pet.tags[0].name}`
            }
            res.status(200).send(js2xmlparser.parse("pet", xmlPet))
        };
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
    
const deletePet = (req, res, next) => {
    let petId = req.params.id;
    Pet.remove({ _id: petId })
        .then(pet => {
            if (pet.length > 0) {
                res.status(200).send(pet)
            } else {
                res.status(404).send(`Can not find pet with id ${petId}.`)
            }
        })
        .catch((err) => {
            res.status(400).send(`Invalid ID supplied.`);
        })
}

const updatePetImgUrl = (req, res, next) => {
    Pet.findByIdAndUpdate(req.params.id, {
        photoUrls: req.body.newPhotoUrls
    }, { new: true}, (err, pet) => {
        if (err) res.send(err);
        else res.status(200).send(pet);
    } );
};

module.exports = {
    createPet,
    getPetById,
    updatePetById,
    getPetsByStatus,
    deletePet,
    updatePetByFormDataViaPost,
    updatePetImgUrl,
    getPetByIdXmlForm
}