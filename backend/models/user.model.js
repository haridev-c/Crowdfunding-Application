const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
