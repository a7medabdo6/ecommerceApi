const { check } = require("express-validator");

exports.UserValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a vaild email").isEmail(),
  check("password", "Please enter a password wit 6 or more characters")
    .isLength({
      min: 6,
    })
    .not()
    .isEmpty(),
];

exports.UserSigninValidator = [
  check("email", "Please include a vaild email").isEmail(),
  check("password", "Please is required").exists(),
];
