const { UserDao } = require("../daos/factory");
const UserRepository = require("../repositories/userRepository");

const userService = new UserRepository(new UserDao());

module.exports = {
  userService,
};
