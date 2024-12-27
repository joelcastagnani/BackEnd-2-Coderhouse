const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: "No autorizado" });
      req.user = user; // Pasamos el usuario al request
      next();
    })(req, res, next);
  };
};
const authorization = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
};

module.exports = {
  passportCall,
  authorization,
};