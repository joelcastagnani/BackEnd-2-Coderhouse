const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const productCollection = "products";

const productSchema = new Schema({
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
    default: 10
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

const productModel = model(productCollection, productSchema);

module.exports = {
  productModel,
};
