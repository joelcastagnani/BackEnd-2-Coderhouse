const { UserDao, ProductDao } = require("../daos/factory");
const ProductRepository = require("../repositories/productsRepository");
const UserRepository = require("../repositories/userRepository");

const userService = new UserRepository(new UserDao());
const productService = new ProductRepository(new ProductDao());

module.exports = {
  userService,
  productService
};
