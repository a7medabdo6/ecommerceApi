const express = require("express");
const router = express.Router();
const { createUser } = require("../../../controllers/admin/createUser");
const { UserValidator } = require("../../../validators/user");

//@route  POST api/users/admin/signup
//@desc   Register User
//@access Public
router.post("/signup", UserValidator, createUser);
module.exports = router;
