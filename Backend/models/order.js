const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: mongoose.ObjectId,
    subId: String,
    date: Date,
    price: String,   
})

module.exports = mongoose.model('order', orderSchema);