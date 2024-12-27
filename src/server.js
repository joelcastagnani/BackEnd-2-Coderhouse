const express = require("express");
const appRouter = require('./routes/index.js');

const handlebars = require("express-handlebars");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const UserRouter = require('./routes/api/userRouter.js')
const viewsRouter = require("./routes/viewsRouter.js");
const sessionsRouter = require("./routes/api/sessionsRouter.js");

const { connectDb, objectConfig } = require("./config/index.js");
require("./config/passportConfig.js");

const app = express();
const PORT = objectConfig.port;

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(appRouter);

function authRequired(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}

app.get("/api/sessions/current", authRequired, (req, res) => {
  res.json(req.user);
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server ON - ${PORT} - EntregaFinal back 2`);
});
app.use('*', (req,res) => {
  res.status(404).send('no existe esta url 404');
});