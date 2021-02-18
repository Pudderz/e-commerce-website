const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: String,
    productName: String,
    numOfReviews: Number,
    averageRating: String,
    
})

module.exports = mongoose.model('product', productSchema);