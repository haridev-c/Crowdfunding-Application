const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePic: { type: String, default: "" },
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
