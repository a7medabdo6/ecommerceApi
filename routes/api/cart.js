const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");

const { CartController, getCartsItems } = require("../../controllers/cart");

router.post("/cart", Auth, CartController);
//router.get("/category/getcategory", getCategoris);
router.get("/cart", Auth, getCartsItems);

module.exports = router;
