const UserDaoMongo = require("../daos/MONGO/userDao.mongo.js");

const userService = new UserDaoMongo();

module.exports = {
    userService
};