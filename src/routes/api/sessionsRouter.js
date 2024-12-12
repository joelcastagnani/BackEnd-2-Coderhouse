const { Router } = require("express");
const passport = require("passport");
const { userModel } = require("../../models/usersModel.js");
const { createHash } = require("../../utils/hash.js");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = Router();
const JWT_SECRET = "clave_secreta";

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
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      firstName,
      lastName,
      age,
      email,
      password: passwordHash,
    });

    return res.status(201).send({
      status: "success",
      message: "Usuario creado exitosamente",
      user: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    console.log(token);
    

    res.cookie("token", token, { httpOnly: true, secure: false });

    console.log("Cookie enviada:", token);

    return res.json({
      token: `Bearer ${token}`,
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
});
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Acceso permitido", user: req.user });
  }
);
// router.get(
//   "/current",
//   passport.authenticate("current", { session: false }),
//   (req, res) => {
//     if (req.user) {
//       return res.json({ user: req.user }); // Devuelve datos del usuario
//     } else {
//       return res.status(401).json({ message: "No autorizado" });
//     }
//   }
// );

module.exports = router;
