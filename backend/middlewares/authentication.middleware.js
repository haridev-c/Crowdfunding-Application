const jwt = require("jsonwebtoken");

const jwtSecret = "asjkdbv9238r4jvdsb";

const authenticateUser = (req, res, next) => {
  console.log("* * * * * * * * * * * * * * * ");
  console.log("Started authenticate middleware");
  const token = req.cookies["token"];
  try {
    if (token) {
      console.log("JWT token captured; verifying ....");
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        console.log("JWT token verified; ");
        next();
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
