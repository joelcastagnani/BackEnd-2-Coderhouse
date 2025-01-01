const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { userModel } = require("../../daos/models/usersModel.js")
const { createHash } = require("../../utils/hash.js");
const { passportCall, authorization } = require("../../utils/passportCall.js");

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

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

  console.log("encontro al usuario");

  //crear el carrito - manager carts
  //res._id

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      //cartID: resp_id
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
    // Verifica si se envió email y password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y password son obligatorios" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verifica que la contraseña almacenada en la base de datos no sea undefined
    if (!user.password) {
      return res
        .status(500)
        .json({ message: "Contraseña no encontrada en la base de datos" });
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: false }); // Solo para pruebas locales: secure: false

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
router.get(
  "/current",
  passportCall("jwt"),
  authorization(["user-premium", "admin"]),
  (req, res) => {
    res.send({ dataUser: req.user, message: "datos sensibles" });
  }
);

module.exports = router;
