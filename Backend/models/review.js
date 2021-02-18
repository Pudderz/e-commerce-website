const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  productId: String,
  productName: String,
  name: String,
  rating: String,
  profileImage: String,
  descriptionTitle: String,
  description: String,
});

module.exports = mongoose.model("review", reviewSchema);
