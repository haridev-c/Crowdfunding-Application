const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
