const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route  GET api/profile/me
//@desc   Get current user profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    profile.populate("user", ["name", "avatar"]);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});
module.exports = router;
