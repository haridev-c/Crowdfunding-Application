const express = require("express");
const { verifyEmail } = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.get("/verify-email", verifyEmail);

module.exports = authRouter;
