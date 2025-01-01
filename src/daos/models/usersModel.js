const { Schema, model } = require("mongoose");

const userCollection = "users";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  carID: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    default: "user",
  },
  password: { type: String, required: true },
  active: { type: Boolean, dafault: true },
});

const userModel = model(userCollection, userSchema);

module.exports = {
  userModel,
};
