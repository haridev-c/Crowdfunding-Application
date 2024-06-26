const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNo: Number,
  age: Number,
  password: { type: String, select: false },
  profilePic: { type: String, default: "" },
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
