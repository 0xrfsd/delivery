let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    userId: {
        type: Number
    },
    commerceId: {
        type: Number
    },
    driverId: {
        type: Number
    },
    orderObj: {
        type: Object
    },
    price: {
        type: Number
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('Order', orderSchema)