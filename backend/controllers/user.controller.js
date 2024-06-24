const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const jwtSecret = "asjkdbv9238r4jvdsb";

const registerUser = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started registerUser func ");
  const { name, email, password } = req.body;

  try {
    console.log("Checking for existing user");
    const doc = await User.findOne({ email });

    if (!doc) {
      console.log("No existing user found; creating new user");
      bcrypt.hash(password, saltRounds).then(async (hash) => {
        const newUser = await User.create({
          name,
          email,
          password: hash,
        });
        res.json({
          serverMsg:
            "Account created successfully, you can now proceed to login",
          success: true,
        });
        console.log("Successfully created a new account");
      });
    } else {
      console.log(
        "Existing user found; alerting user to login insted of signup"
      );
      res.json({
        serverMsg: "User already exists, please login",
        success: false,
      });
    }
  } catch (error) {
    console.log(
      "Something went wrong with registering a user; check registerUser in user.controller.js"
    );
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const loginUser = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started loginUser func");
  console.log("Destructuring email and password from request");
  const { email, password } = req.body;

  try {
    console.log("Checking email id for existing account");
    const doc = await User.findOne({ email });

    if (doc) {
      console.log("Email id found, comparing password with hash");
      bcrypt.compare(password, doc.password).then((result) => {
        if (result) {
          console.log("Hash matched successfully; signing JWT token");
          jwt.sign(
            { _id: doc._id, email: doc.email },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              console.log(
                "Signed JWT successfully; sending the JWT back with the response"
              );
              res
                .cookie("token", token)
                .json({ success: true, serverMsg: "Login Successfull" });
            }
          );
        } else {
          console.log(
            "Password did not match; alerting user to check password"
          );
          res.json({
            success: false,
            serverMsg: "Password did not match, try again",
          });
          console.log("Response sent");
        }
      });
    }
  } catch (error) {
    console.log(
      "Some error happened in loginUser func in user.controller.js file"
    );
    res.status(500).json(error);
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    console.log("- - - - - - - - - - - - - - - ");
    console.log("Started getProfile func");
    console.log("Getting token from request");
    const token = req.cookies["token"];
    if (token) {
      console.log("JWT token captured successfully; going to verify token");
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        console.log("JWT token verified; going to get user details from db");
        const { name, email, _id } = await User.findById(userData._id);
        res.json({ name, email, _id });
        console.log("response sent");
      });
    } else {
      console.log("No JWT token found; sending back null with response");
      res.json(null);
    }
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const logoutUser = (req, res) => {
  console.log("logoutUser func started");
  res.clearCookie("token");
  res.json({ success: true, serverMsg: "Logged out successfully" });
  console.log("Successfully logged out user");
  console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ ");
};

module.exports = { registerUser, loginUser, getProfile, logoutUser };
