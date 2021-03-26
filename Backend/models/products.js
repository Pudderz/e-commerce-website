const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: String,
    numOfReviews: Number,
    averageRating: String,
    description: String,
    price: String,
    stock: [String],
    images: [String],
    categories: [String],
    datePosted: Number,
    slug: String,
    discounted: Boolean,
    discountedPrice: String,
})

module.exports = mongoose.model('product', productSchema);