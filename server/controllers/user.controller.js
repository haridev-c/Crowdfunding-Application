const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;

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
    const doc = await User.findOne({ email }).select("+password").exec();
    console.log(doc);
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
              res.cookie("token", token).json({
                success: true,
                serverMsg: "Login Successfull",
                user: {
                  id: doc._id,
                  name: doc.name,
                  email: doc.email,
                  profilePic: doc.profilePic,
                },
              });
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
    } else {
      console.log("No doc found");
      res.json({
        success: false,
        serverMsg: "Did not find any existing account, please login",
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

// const getProfile = async (req, res) => {
//   try {
//     console.log("- - - - - - - - - - - - - - - ");
//     console.log("Started getProfile func");
//     console.log("Getting token from request");
//     const token = req.cookies["token"];
//     if (token) {
//       console.log("JWT token captured successfully; verifying token");
//       jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         console.log("JWT token verified; getting user details from db");
//         const userObject = await User.findById(userData._id);
//         res.json(userObject);
//         console.log("response sent");
//       });
//     } else {
//       console.log("No JWT token found; sending null response");
//       res.json(null);
//     }
//   } catch (error) {
//     console.log(error);
//     res.json(null);
//   }
// };

const getProfile = async (req, res) => {
  try {
    console.log("getProfile function called");
    console.log("Cookies received:", req.cookies);
    const token = req.cookies["token"];
    if (token) {
      console.log("Token found:", token);
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          console.error("Token verification error:", err);
          return res.status(401).json({ error: "Invalid token" });
        }
        console.log("Token verified, user data:", userData);
        const userObject = await User.findById(userData._id);
        console.log("User object retrieved:", userObject);
        res.json(userObject);
      });
    } else {
      console.log("No token found in cookies");
      res.status(401).json({ error: "No token provided" });
    }
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("logoutUser func started");
  res.clearCookie("token");
  res.json({ success: true, serverMsg: "Logged out successfully" });
  console.log("Successfully logged out user");
};

const updateDp = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("updateDp func started");
  try {
    const userID = req.body.userID;
    console.log("Updating user doc");
    User.findByIdAndUpdate(
      userID,
      { $set: { profilePic: req.file.filename } },
      { new: true }
    ).then((updatedDoc) => {
      if (updatedDoc) {
        console.log("Doc update complete");
        res.json({ success: true, serverMsg: "Doc update complete" });
      } else {
        console.log(
          "Something unexpected happened in updateDP while updating document to db"
        );
        res.json({
          success: false,
          serverMsg:
            "Something unexpected happened in updateDP while updating document to db",
        });
      }
    });
  } catch (error) {
    console.log("Error occured in updateDp func in user.controller.js file");
    console.log(error);
    res.json({ success: false, serverMsg: "Internal server error" });
  }
};

const getDP = async (req, res) => {
  try {
    console.log("- - - - - - - - - - - - - - - ");
    console.log("Started getDP func");
    const fileName = req.params.filename;

    const uploadsDir = path.join(__dirname, "..", "uploads");
    const imagePath = path.join(uploadsDir, fileName);

    console.log("Full image path:", imagePath);

    try {
      // console.log("Starting authorisation check");
      // Authorisation check
      // if (req.authenticatedUser.profilePic !== fileName) {
      //   console.log("Unautherised request!");
      //   res.json({ success: false, serverMsg: "Unautherised request!" });
      // } else {
      //   console.log("Authorisation check passed");
      //   await fs.access(imagePath, fs.constants.R_OK);
      //   console.log("File exists and is readable");

      //   res.setHeader("Content-Type", "image/jpeg");
      //   res.setHeader("Cache-Control", "public, max-age=3600");
      //   res.setHeader("Content-Disposition", "inline");

      //   res.sendFile(imagePath);
      //   console.log("File sent");
      // }
      await fs.access(imagePath, fs.constants.R_OK);
      console.log("File exists and is readable");

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("Content-Disposition", "inline");

      res.sendFile(imagePath);
      console.log("File sent");
    } catch (err) {
      console.log("File does not exist or is not readable");
      console.error("Error details:", err);
      return res.status(404).send("Image not found");
    }
  } catch (error) {
    console.log("Error in getDP func in user.controller.js file");
    console.error(error);
    res
      .status(500)
      .json({ success: false, serverMsg: "Internal server error" });
  }
};

const updateUserDetails = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started updateUserDetails func in user.controller.js file");
  try {
    const { name, age, phoneNo } = req.body;
    const { _id } = req.authenticatedUser;
    console.log("Updating user details");
    const updatedDoc = await User.findByIdAndUpdate(
      _id,
      {
        $set: { name, age, phoneNo },
      },
      { new: true }
    );

    if (!updatedDoc) {
      console.log("Something went wrong in updateUserDetails");
      res.json({
        success: false,
        serevrMsg: "Something went wrong while trying to update user details",
      });
    } else {
      console.log("Update successfull");
      res.json({
        success: true,
        serverMsg: "User details updated successfully",
        updatedDoc,
      });
    }
  } catch (error) {
    console.log(
      "Error in updateUserDetails func in user.controller.js file: ",
      error
    );
    res.json({ success: false, serverMsg: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateDp,
  getDP,
  updateUserDetails,
};
