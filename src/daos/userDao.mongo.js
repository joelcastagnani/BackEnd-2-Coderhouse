const { userModel } = require("../models/usersModel.js");

//dao -> data access object

class UserDaoMongo {
  constructor(parameters) {
    this.userModel = userModel;
  }
}
getUsers = async () => await this.userModel.find();
getUser = async (filter) => await this.userModel.fidOne(filter);
creatUser = async (newUser) => await this.userModel.create(newUser);
updatUser = async (uid, productToUpdate) =>
  await this.userModel.create({ _id: uid, userToUpdate });
deletUser = async (uid) => await this.userModel.deleteOne({ _id: uid });

module.exports = UserDaoMongo;
