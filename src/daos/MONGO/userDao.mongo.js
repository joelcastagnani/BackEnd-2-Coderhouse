const { userModel } = require("../models/usersModel.js");

//dao -> data access object

class UserDaoMongo {
  constructor() {
    this.userModel = userModel;
  }
}
get = async () => await this.userModel.find();
getBy = async (filter) => await this.userModel.fidOne(filter);
create = async (newUser) => await this.userModel.create(newUser);
update = async (uid, productToUpdate) =>
  await this.userModel.create({ _id: uid, userToUpdate });
delet = async (uid) => await this.userModel.deleteOne({ _id: uid });

module.exports = UserDaoMongo;
