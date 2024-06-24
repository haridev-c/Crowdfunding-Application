const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/user.controller");

const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", getProfile);
userRouter.post("/logout", logoutUser);

module.exports = userRouter;
