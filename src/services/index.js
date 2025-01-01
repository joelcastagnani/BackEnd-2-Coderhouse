const { UserDao } = require("../daos/factory");

const userService = new UserDao();

module.exports = {
  userService,
};
