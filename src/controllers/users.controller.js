const { userService } = require("../services");

class UserController {
  constructor(parameters) {
    this.service = userService;
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getUsers();
      res.send({ status: "success", data: users });
    } catch (error) {
      console.log(error);
    }
  };
  createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email) {
      return res.send({ status: "error", error: "faltan llenar campos" });
    }

    const result = await this.userService.createProduct({ firstName, lastName, email, password });

    res.send({ status: "success", data: result });
  };
  getUser = async (req, res) => {
    const { uid } = req.params;
    const user = await this.userService.getUser({_id: uid});
    res.send({ status: "success", data: user });
  };
  updateUser = async (req, res) => {
    const { uid } = req.params;

    const { firstName, lastName, email } = req.body;

    if (!email) {
      return res.send({ status: "error", error: "faltan llenar campos" });
    }

    const userToUpdate = {
      firstName,
      lastName,
      email,
    };

    const result = await this.userService.updateUser(
      { _id: uid },
      userToUpdate
    );

    res.send({ status: "success", datra: result });
  };
  deleteUser = async (req, res) => {
    const { uid } = req.params;
    const result = await this.userService.deleteUser(uid);
    res.send({ status: "success", data: result });
  };
}

module.exports = UserController;
