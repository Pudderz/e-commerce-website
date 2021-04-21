const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSize = new Schema({
    shoeSize: Number,
    stock: Number,
  });


const productSchema = new Schema({
    productName: String,
    numOfReviews: Number,
    description: String,
    price: Number,
    stock: [stockSize],
    images: [String],
    categories: [String],
    datePosted: Number,
    slug: String,
    discounted: Boolean,
    discountedFrom: Number,
    gender:String,
    sold: Number,
})

module.exports = mongoose.model('products', productSchema);