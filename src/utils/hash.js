const bcrypt = require("bcrypt");

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (password, passwordHashed) => {
  return bcrypt.compareSync(password, passwordHashed);
};

module.exports = { createHash, isValidPassword };