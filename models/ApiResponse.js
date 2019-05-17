const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApiResponseSchema = new Schema({
    code: {
        type: Number,        
        trim: true
    },
    type: {
        type: String,
        trim: true
    },      
    message: {
        type: String,
        trim: true
    }   
});

let ApiResponseModel = mongoose.model('ApiResponse', ApiResponseSchema);

module.exports = ApiResponseModel;