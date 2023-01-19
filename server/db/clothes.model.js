const mongoose = require("mongoose");

const { Schema } = mongoose;
const ClothesSchema = new Schema({
  name: String,
  type: String,
  price: Number,
});
module.exports = mongoose.model("Clothes", ClothesSchema);
