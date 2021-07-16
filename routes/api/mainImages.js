const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const { ImagesController, getAllIMages } = require("../../controllers/Images");

router.get("/images", getAllIMages);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../uploads/mainImages"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });
router.post(
  "/images/upload",
  // Auth,
  // adminMiddleware,
  upload.array("pictures"),

  ImagesController
);
module.exports = router;
