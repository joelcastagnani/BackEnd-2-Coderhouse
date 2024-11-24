const { Schema, model } = require("mongoose");

const userCollection = "users";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: String,
    default: "hola",
  },
  role: {
    type: String,
    default: "user",
  },
});

const userModel = model(userCollection, userSchema);

module.exports = {
  userModel,
};
