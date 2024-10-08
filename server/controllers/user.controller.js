const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const { sendVerificationEmail } = require("./auth.controller");

const registerUser = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started createUser() ");
  try {
    const { name, email, password } = req.body;
    console.log("Checking for existing user");
    const doc = await User.findOne({ email });

    // if user already exists, return 400 status code
    if (doc) return res.status(400).json({ serverMsg: "User already exists" });

    await sendVerificationEmail(email, password, name);
    return res
      .status(200)
      .json({ serverMsg: "Verification email sent, please verify your email" });
  } catch (error) {
    console.log("Error in createUser() in auth.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const loginWithPass = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started loginWithPass()");
  try {
    const { email, password } = req.body;
    console.log("Checking email id for existing account");
    const doc = await User.findOne({ email }).select("+password").exec();
    console.log(doc);

    // send response if no doc found
    if (!doc) {
      console.log("No doc found");
      return res.status(404).json({
        serverMsg: "Did not find an existing account, please signup",
      });
    }

    // if doc found compare password with hash
    console.log("Email id found, comparing password with hash");
    const isMatch = await bcrypt.compare(password, doc.password);

    // send response if password did not match
    if (!isMatch) {
      console.log("Password did not match; alerting user to check password");
      return res
        .status(400)
        .json({ serverMsg: "Password did not match, try again" });
    }

    // if password matched sign JWT token
    console.log("Hash matched successfully; signing JWT token");
    const token = jwt.sign(
      { _id: doc._id, email: doc.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    if (!token)
      return res.status(500).json({ serverMsg: "Internal server error" });

    console.log(
      "Signed JWT successfully; sending the JWT back with the response"
    );

    // eslint-disable-next-line no-unused-vars
    const { password: hashedPassword, __v, ...rest } = doc.toObject();

    return res.status(200).cookie("token", token).json({
      serverMsg: "Login Successfull",
      user: rest,
    });
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
    return res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ error: "Internal server error" });
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
    const userID = req.user._id;
    const oldImagePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.user?.profilePic
    );
    // if old profile picture exist in server, delete it before updating new picture
    try {
      await fs.access(oldImagePath, fs.constants.F_OK);
      await fs.unlink(oldImagePath);
    } catch (error) {
      console.log("Old profile picture does not exist");
      console.error(error);
    }

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

    const imagePath = path.join(__dirname, "..", "uploads", fileName);

    console.log("Full image path:", imagePath);

    try {
      await fs.access(imagePath, fs.constants.R_OK);
      console.log("File exists and is readable");

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("Content-Disposition", "inline");

      return res.status(200).sendFile(imagePath);
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
    const { _id } = req.user;

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
  loginWithPass,
  getProfile,
  logoutUser,
  updateDp,
  getDP,
  updateUserDetails,
};
