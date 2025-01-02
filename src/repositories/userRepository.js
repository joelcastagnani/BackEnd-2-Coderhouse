const { UserDto } = require("../dtos/usersDtos");

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  get = async () => await this.dao.get();
  getBy = async (filter) => await this.dao.get(filter);
  create = async (User) => {
    const newUser = new UserDto(user);
    return await this.dao.create(newUser);
  };
  update = async (uid, userToUpdate) =>
    await this.dao.create(uid, userToUpdate);
  delete = async (uid) => await this.dao.create(uid);
}

module.exports = UserRepository;
