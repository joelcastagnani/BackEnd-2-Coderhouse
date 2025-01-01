const { objectConfig } = require("../config");

const { persistence } = objectConfig;

let UserDao;
let productDao;
let cartDao;

switch (persistence) {
  case "memory":
    const UserDaoMemory = require("./MEMORY/userDaoMemory");
    UserDao = UserDaoMemory;
    break;
  case "file":
    const userDaoFile = require("./FILE/userManagerFile");
    UserDao = UserDaoFile;
    break;
  default:
    const UserDaoMongo = require("./MONGO/userDao.mongo");
    UserDao = UserDaoMongo;
    break;
}

module.exports = { UserDao };
