const { userModel } = require("../models/usersModel.js");


class UserDaoMemory {
  constructor() {
    this.userModel = userModel;
  }
}

get = async () => {};

getBy = async (filter) => {};

create = async (newUser) => {};

update = async (uid, productToUpdate) => {};

delet = async (uid) => {};

module.exports = UserDaoMemory;
