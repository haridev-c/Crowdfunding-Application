const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { Resend } = require("resend");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const resend = new Resend(process.env.RESEND_API_KEY);

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

const sendVerificationEmail = async (email, password, name) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { name, email, password: hashedPassword },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const verificationLink = `http://localhost:5050/auth/verify-email?token=${token}`;

    await resend.emails.send({
      from: "SparkFund <sparkfund@haridev.dev>",
      to: email,
      subject: "Email Verification",
      html: `<p>Please verify your email by clicking on the following link: <a href="${verificationLink}">Verify Email</a></p>`,
    });
  } catch (error) {
    console.log("Error in sendVerificationEmail() in auth.controller.js file");
    console.error(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const { name, email, password } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user)
      return res
        .status(400)
        .json({ serverMsg: "Error creating account", user });

    return res
      .status(200)
      .send("Email verified successfully, please login to continue");
  } catch (error) {
    console.log("Error in verifyEmail() in auth.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Email verification failed" });
  }
};

module.exports = { passport, verifyEmail, authenticate, sendVerificationEmail };
