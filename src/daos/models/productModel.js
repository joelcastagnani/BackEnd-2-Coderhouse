const mongoose = require("mongoose");
const { Schema, model, Collection } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: String,
  atCreate: {
    type: Date,
    default: new Date(),
  },
});

const productModel = mongoose.model('Product', ProductSchema);

module.exports = {
  productModel,
};
