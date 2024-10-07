const {
  registerUser,
  loginWithPass,
  getProfile,
  logoutUser,
  updateDp,
  getDP,
  updateUserDetails,
} = require("../controllers/user.controller");

const express = require("express");
const { authenticate } = require("../controllers/auth.controller");
const upload = require("../middlewares/imageUpload");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginWithPass);
userRouter.get("/profile", authenticate, getProfile);
userRouter.post("/logout", logoutUser);
userRouter.put("/dp", authenticate, upload.single("profilePic"), updateDp);
userRouter.get("/dp/:filename", getDP);
userRouter.patch("/profile", authenticate, updateUserDetails);

module.exports = userRouter;
