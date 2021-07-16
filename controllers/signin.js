const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // See if user exists

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    if (user.role != "user") {
      return res
        .status(400)
        .json({
          errors: [
            { msg: "this is admin not allowed to signin with this api" },
          ],
        });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        const { email, name, role, _id, avatar } = user;
        const UserData = { email, name, role, _id, avatar };
        res.json({ token, UserData });
      }
    );
  } catch (e) {
    res.status(500).send("Server error");
  }
};
