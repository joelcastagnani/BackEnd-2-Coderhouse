const express = require("express");
const handlebars = require("express-handlebars");

const userRouter = require("./routes/api/userRouter.js");
const viewsRouter = require('./routes/viewsRouter.js')
const sessionsRouter = require('./routes/api/sessionsRouter.js');
const { connectDb } = require("./config/index.js");
const session = require('express-session');



const app = express();
const PORT = 8080;

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
  }));

app.use('/api/sessions/', sessionsRouter)
app.use('/', viewsRouter)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server ON - ${PORT} - Primer entrega back 2`);
});
