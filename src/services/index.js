const UserDaoMongo = require("../daos/userDao.mongo.js");

const userService = new UserDaoMongo();

module.exports = {
    userService
};