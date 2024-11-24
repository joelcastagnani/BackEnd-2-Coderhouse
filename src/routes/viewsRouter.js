const { Router } = require("express");

const router = Router();

router.use("/login", (req, res) => {
  res.render("login");
});
router.use("/register", (req, res) => {
  res.render("register");
});
router.use("/", (req, res) => {
  res.render("index");
});

module.exports = router;
