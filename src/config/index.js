const { connect } = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const uri = 'mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/primerPreEntrega'

const connectDb = async () => {
    console.log('base de datos conectada')
    await connect(uri)
}

module.exports = {
    connectDb
}