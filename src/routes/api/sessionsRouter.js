const { Router } = require("express");

const { userModel } = require("../../models/usersModel.js");
const { createHash } = require("../../utils/hash.js");
const { log } = require("console");

const router = Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "error", error: "email y password son obligatorios" });
  }

  const userFound = await userModel.findOne({ email });

  if (userFound) {
    return res
      .status(401)
      .send({ status: "error", error: "El usuario ya existe" });
  }

  try {
    const passwordHash = createHash(password);
    const result = await userModel.create({
      firstName,
      lastName,
      age,
      email,
      password: passwordHash,
    });
    
    req.session.userId = result._id;
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;