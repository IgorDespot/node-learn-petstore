const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    petId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    shipDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['PLACED', 'APPROVED', 'DELIVERED'],
        default: 'PLACED',
        required: true
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    }
});

let Order = mongoose.model('ORDER', OrderSchema);

module.exports = Order;