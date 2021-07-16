const express = require("express");
const router = express.Router();
const { createUser } = require("../../controllers/createUser");
const { UserValidator } = require("../../validators/user");
const { createUserSeeder } = require("../../seeders/createUsersSeeder");
//@route  POST api/users
//@desc   Register User
//@access Public
router.post("/signup", UserValidator, createUserSeeder);
module.exports = router;
