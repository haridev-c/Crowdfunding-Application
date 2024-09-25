const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateDp,
  getDP,
  updateUserDetails,
} = require("../controllers/user.controller");

const express = require("express");
const authenticate = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/imageUpload");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", getProfile);
userRouter.post("/logout", logoutUser);
userRouter.post(
  "/update-dp",
  authenticate,
  upload.single("profilePic"),
  updateDp
);
userRouter.get("/get-dp/:filename", getDP);
userRouter.post("/update-user-details", authenticate, updateUserDetails);

module.exports = userRouter;
