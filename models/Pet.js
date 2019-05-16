const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name:{
        type: String,
        unique: true
    }
});

let TagSchema = new Schema({
    name:{
        type: String,
        unique: true
    }
});

let PetSchema = new Schema({
    category: {
        type: CategorySchema
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    photoUrls: {
        type: [String],
        required: true
    },
    tags: {
        type: [TagSchema]
    },
    status: {
        type: String,
        enum : ['AVAILABLE', 'PENDING', 'SOLD']
    }
});

let PetModel = mongoose.model('Pet', PetSchema);

module.exports = PetModel;