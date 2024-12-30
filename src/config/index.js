const { connect } = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const { program } = require('../utils/commander.js');
const { MongoSingleton } = require("./singleton.js");

const { mode } = program.opts();

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
});

if (!process.env.PORT || !process.env.MONGO_DB) {
  console.error("Error: Variables de entorno no cargadas correctamente.");
  process.exit(1);
}

const objectConfig = {
  port: process.env.PORT || 8080,
  mongoDB: process.env.MONGO_DB,
};

const uri = process.env.MONGO_DB;
console.log(uri);

const connectDb = async () => {
  // console.log("base de datos conectada");
  // await connect(uri);

  await MongoSingleton.getInstance();
};

module.exports = {
  connectDb,
  objectConfig,
};
