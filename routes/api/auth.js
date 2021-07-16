const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { signin } = require("../../controllers/signin");

const User = require("../../models/User");
const { UserSigninValidator } = require("../../validators/user");
//@route  GET api/auth
//@desc   Test route
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route  GET api/auth/signin
//@desc   Authenticate user $get token
//@access Public
router.post("/signin", UserSigninValidator, signin);
module.exports = router;
