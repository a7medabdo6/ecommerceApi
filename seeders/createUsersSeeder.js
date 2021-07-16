const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { validationResult } = require("express-validator");
var faker = require("faker");

exports.createUserSeeder = async (req, res) => {
  try {
    // See if user exists

    //Get users gravtar

    for (var i = 0; i < 30; i++) {
      var name = faker.name.findName(); // Rowan Nikolaus
      var email = faker.internet.email(); // Kassandra.Haley@erich.biz
      var avatar = faker.image.avatar();
      var password = faker.internet.password();
      var role = "admin";
      var contactNumber = faker.phone.phoneNumber();
      var photo = faker.image.image();

      user = new User({
        name,
        email,
        avatar,
        password,
        role,
        contactNumber,
        photo,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    }
    res.send("done");

    // Return jsonwebtoken
  } catch (e) {
    res.status(500).send("Server error");
  }
};
