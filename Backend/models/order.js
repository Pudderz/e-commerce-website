const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    subId: String,
    date: Date,
    price: Number,
    items: [String],
    shippingAddress:{
        name: String,
        city: String,
        street: String,
        postalCode: String,
        country: String,
    },
    orderNotes: String,   
    status: String,
})

module.exports = mongoose.model('orders', orderSchema);