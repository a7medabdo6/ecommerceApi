const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");
const { adminMiddleware } = require("../../middleware/adminMiddle");
const {
  ProductController,
  getProducts,
  getProductById,
  UpdateProduct,
  SearchApi,
} = require("../../controllers/product");
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const { ProductValidator } = require("../../validators/product");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../uploads/products"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post(
  "/product/create",
  // Auth,
  // adminMiddleware,
  upload.array("pictures"),
  ProductValidator(),
  ProductController
);
router.get("/products", getProducts);
router.get("/product/search", SearchApi);
router.post("/product/update/:id", UpdateProduct);

router.get("/product/:id", getProductById);

module.exports = router;
