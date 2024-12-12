const passport = require("passport");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/usersModel.js");
const { PRIVATE_KEY } = require("./jwt.js");

const JWTStrategy = jwt.Strategy;
const ExtractHWT = jwt.ExtractJwt;

const initializePassport = () => {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['token'];

    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (contenidoDesencriptadoToken, done) => {
        try {
          return done(null, contenidoDesencriptadoToken);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = {
  initializePassport,
};
