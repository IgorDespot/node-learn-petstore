const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    petId: {
        type: Number,
        required: [true, 'You need to put petID']
    },
    quantity: {
        quantity: Number,
        required: [true, 'You need to put quantity']
    },
    shipDate: {
        type: Date,
        required: [true, 'You need to put shipDate']
    },
    status: {
        type: String,
        enum: ['placed', 'approved', 'delivered'],
        required: [true, 'You need to put status']
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    },
})


module.exports = mongoose.model('Order', OrderSchema);