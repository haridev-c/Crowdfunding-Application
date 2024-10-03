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
        await User.create({
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
  try {
    const { email, password } = req.body;
    console.log("Checking email id for existing account");
    const doc = await User.findOne({ email }).select("+password").exec();
    console.log(doc);

    // send response if no doc found
    if (!doc) {
      console.log("No doc found");
      return res
        .status(404)
        .json({ serverMsg: "Did not find any existing account, please login" });
    }

    // if doc found compare password with hash
    console.log("Email id found, comparing password with hash");
    const result = await bcrypt.compare(password, doc.password);

    // send response if password did not match
    if (!result) {
      console.log("Password did not match; alerting user to check password");
      return res
        .status(400)
        .json({ serverMsg: "Password did not match, try again" });
    }

    // if password matched sign JWT token
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

        const { password: hashedPassword, __v, ...rest } = doc.toObject();

        return res.status(200).cookie("token", token).json({
          serverMsg: "Login Successfull",
          user: rest,
        });
      }
    );
  } catch (error) {
    console.log("Error loginUser() in user.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  console.log("- - - - - - - - - - - - ");
  console.log("getProfile function called");
  try {
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
    const updatedDoc = await User.findByIdAndUpdate(
      userID,
      { $set: { profilePic: req.file.filename } },
      { new: true }
    );

    if (!updatedDoc) {
      console.log("Error while updating document to db");
      return res.status(500).json({ serverMsg: "Error in updating dp" });
    }

    // send success response
    console.log("Doc update complete");
    return res.status(200).json({ updatedDoc: updatedDoc });
  } catch (error) {
    console.log("Error occured in updateDp func in user.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const getDP = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getDP func");
  try {
    const fileName = req.params.filename;

    const uploadsDir = path.join(__dirname, "..", "uploads");
    const imagePath = path.join(uploadsDir, fileName);

    console.log("Full image path:", imagePath);

    try {
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
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const updateUserDetails = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started updateUserDetails func in user.controller.js file");
  try {
    const { name, age, phoneNo } = req.body;
    const { _id } = req.authenticatedUser;

    // check if user exists and update details
    console.log("Updating user details");
    const updatedDoc = await User.findByIdAndUpdate(
      _id,
      { $set: { name, age, phoneNo } },
      { new: true }
    );

    if (!updatedDoc) {
      console.log("Something went wrong in updateUserDetails");
      return res.status(500).json({ serevrMsg: "Error updating user details" });
    }

    // send success response
    console.log("Update successfull");
    return res.status(200).json({
      serverMsg: "User details updated successfully",
      updatedDoc,
    });
  } catch (error) {
    console.log("Error in updateUserDetails() in user controller ");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
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
