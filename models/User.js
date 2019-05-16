const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');

const validatePass = (pass) => {
    return validator.isLength(pass, 8);
};

const validateEmail = (email) => {
    return validator.isEmail(email);
};

let UserSchema = new Schema({
    username: {
        value: String,
        required: [true, 'This field must be filled'],
        trim: true
    },
    firstName: {
        value: String,
        required: [true, 'This field must be filled'],
        trim: true
    },
    lastName: {
        value: String,
        required: [true, 'This field must be filled'],
        trim: true
    },
    email: {
        value: String,
        required: [true, 'This field must be filled'],
        trim: true,
        validation: [validateEmail, 'You must enter a valid email']
    },
    password: {
        value: String,
        required: [true, 'This field must be filled'],
        trim: true,
        validate: [validatePass, 'You password must be atleast 8 characters long']
    },
    phone: {
        value: String,
        trim: true,
        required: [true, 'This field must be filled']
    },
    userStatus: {
        value: Number,
        required: [true, 'This field must be filled'],
        trim: true
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;