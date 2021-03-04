const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  productId: String,
  subId: String,
  productName: String,
  name: String,
  rating: String,
  profileImage: String,
  descriptionTitle: String,
  description: String,
  edited: Boolean,
});

module.exports = mongoose.model("review", reviewSchema);
