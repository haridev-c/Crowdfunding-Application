const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const User = require("../models/user.model");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload._id);

      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      console.log("Error in passport.use() in auth.controller.js file");
      console.error(error);
      return done(error, false);
    }
  })
);

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ serverMsg: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ serverMsg: "Unauthorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { passport, authenticate };
