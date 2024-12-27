const { Router } = require("express");
const UserController = require("../../controllers/users.controller.js");

const router = Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } =
  new UserController();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:uid", getUser);
router.put("/:uid", updateUser);
router.delete("/:uid", deleteUser);

module.exports = router;
