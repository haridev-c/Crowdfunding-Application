const { registerUser } = require("../controllers/user.controller");

const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", registerUser);

module.exports = userRouter;
