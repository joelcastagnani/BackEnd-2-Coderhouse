const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const userModel = require("../models/usersModel");
const JWT_SECRET = "clave_secreta";
const express = require("express");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/usersModel.js");
const router = express.Router();
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.token]),
  secretOrKey: "clave_secreta",
};

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Login successfull" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await userModel.findById(jwtPayload.id);
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
passport.use(
  "current",
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies["accessToken"];
        }
        return token;
      },
      secretOrKey: "tu_secreto_jwt",
    },
    (jwtPayload, done) => {
      // Buscar al usuario en la base de datos
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
