const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    subId: String,
    date: Date,
    price: String,   
})

module.exports = mongoose.model('orders', orderSchema);