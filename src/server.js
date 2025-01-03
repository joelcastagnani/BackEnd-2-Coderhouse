const express = require("express");
const appRouter = require('./routes/index.js');

const handlebars = require("express-handlebars");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const UserRouter = require('./routes/api/userRouter.js')
const viewsRouter = require("./routes/viewsRouter.js");
const sessionsRouter = require("./routes/api/sessionsRouter.js");
const productsRouter = require('./routes/api/productsRouter.js');
const { productModel } = require("./daos/models/productModel.js");

const { connectDb, objectConfig } = require("./config/index.js");
require("./config/passportConfig.js");



const app = express();
app.use(express.json());
const PORT = objectConfig.port;
app.use(cors());


// app.get("/api/users", (req, res) => {
//   res.json([
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//   ]);
// });

connectDb();
// app.get('/api/products', (req, res) => {
//   res.json([{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }]);
// });

app.use('/api/products', productsRouter);


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(cors());

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