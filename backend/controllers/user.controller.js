const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const doc = await User.findOne({ email });

    if (!doc) {
      bcrypt.hash(password, saltRounds).then(async (hash) => {
        const newUser = await User.create({
          name,
          email,
          password: hash,
        });
        res.json({
          serverMsg:
            "Account created successfully, you can now proceed to login",
          success: true,
        });
      });
    } else {
      res.json({
        serverMsg: "User already exists, please login",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = { registerUser };
