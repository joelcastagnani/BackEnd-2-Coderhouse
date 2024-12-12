const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const userRouter = require("./routes/api/userRouter.js");
const viewsRouter = require("./routes/viewsRouter.js");
const sessionsRouter = require("./routes/api/sessionsRouter.js");

const { connectDb } = require("./config/index.js");
require("./config/passportConfig.js");

const app = express();
const PORT = 8080;

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser()); 

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middleware para proteger rutas
function authRequired(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
}



app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/api/sessions/current', authRequired, (req, res) => {
  res.json(req.user);
});
app.use("/api/sessions/", sessionsRouter);
app.use("/", viewsRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server ON - ${PORT} - Primer entrega back 2`);
});
