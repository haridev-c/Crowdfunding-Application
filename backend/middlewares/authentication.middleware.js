const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const jwtSecret = "asjkdbv9238r4jvdsb";

const authenticateUser = (req, res, next) => {
  console.log("* * * * * * * * * * * * * * * ");
  console.log("Started authenticate middleware");
  const token = req.cookies["token"];
  try {
    if (token) {
      console.log("JWT token captured; verifying ....");
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          throw err;
        } else {
          console.log("JWT token verified; getting user data from db ");
          const user = await User.findById(userData._id);
          if (!user) {
            console.log("User data not found in Database");
            res.json({
              success: false,
              serverMsg: "User not found in database",
            });
          } else {
            console.log(
              "User data captured from db; attaching user details to request "
            );
            req.authenticatedUser = user;
            console.log(
              "User details attached to request; calling next function"
            );
            next();
          }
        }
      });
    } else {
      console.log("No token found; sending failure response");
      res.json({
        success: false,
        serverMsg:
          "No authentication token found, please signout and login again",
      });
    }
  } catch (error) {
    console.log("Error occured in authenticate middleware", error);
    res.json({ success: false, serverMsg: "Internal server error" });
  }
};

module.exports = authenticateUser;
