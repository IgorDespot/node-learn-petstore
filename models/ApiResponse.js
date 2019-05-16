const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ApiResponseSchema = new Schema({
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

const ApiResponseModel = mongoose.model('ApiResponse', ApiResponseSchema);

module.exports = ApiResponseModel;