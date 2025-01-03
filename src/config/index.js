const { connect } = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const { program } = require("../utils/commander.js");
const { MongoSingleton } = require("./singleton.js");
const { Command } = require("commander");
const { mode, persistence } = program.opts();
console.log(mode, persistence);

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
});

if (!process.env.PORT || !process.env.MONGO_DB) {
  console.error("Error: Variables de entorno no cargadas correctamente.");
  process.exit(1);
}

console.log("Conectando a la base de datos:", process.env.MONGO_DB);


const objectConfig = {
  // port: process.env.PORT || 8080,
  port: 8080,
  mongoDB: process.env.MONGO_DB,
  persistence,
};
const uri = process.env.MONGO_DB;
console.log(uri);

const connectDb = async () => {

  await MongoSingleton.getInstance();
};

module.exports = {
  connectDb,
  objectConfig,
  program
};
