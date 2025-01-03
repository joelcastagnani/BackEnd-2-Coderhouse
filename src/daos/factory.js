const UserDaoMongo = require("./MONGO/userDao.mongo.js"); 
const ProductDaoMongo = require("./MONGO/productsDao.mongo.js");

const { objectConfig } = require("../config");

const { persistence } = objectConfig;

let UserDao;
let ProductDao;
let CartDao;

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
    const UserDaoMongo = require("./MONGO/userDao.mongo.js");
    UserDao = UserDaoMongo;

    const ProductDaoMongo = require('./MONGO/productsDao.mongo.js')
    const productDao = new ProductDaoMongo();
    break;
}

module.exports = {
  UserDao: UserDaoMongo,
  ProductDao: ProductDaoMongo,
};
