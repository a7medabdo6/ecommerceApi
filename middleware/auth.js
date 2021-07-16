const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  //Get token from header
  //const token = req.header("x-auth-token");
  const token = req.cookies.token;
  console.log(token, "token");
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token , authorization denied" });
  }
  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    const user = await User.findById(req.user.id);
    req.userInfo = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
