const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");
const { adminMiddleware } = require("../../middleware/adminMiddle");
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const {
  CategoryController,
  getCategoris,
} = require("../../controllers/category");
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });
*/
router.post(
  "/category/create",
  // Auth,
  // adminMiddleware,
  // upload.single("categoryImage"),
  CategoryController
);
router.get("/category", getCategoris);

module.exports = router;
