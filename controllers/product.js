const Product = require("../models/product");
const shortId = require("shortid");
const { default: slugify } = require("slugify");
const { query } = require("express");
const { check, validationResult } = require("express-validator");

exports.ProductController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = [];
    for (var i = 0; errors.array().length > i; i++) {
      console.log(errors.array()[i].param);
      var e = errors.array()[i].param;
      error.push({ error: req.t(e) });
    }
    return res.status(400).json({ error });
  }
  const {
    name,
    price,
    salePrice,
    discount,

    shortDetails,
    stock,
    sale,
    description,
    category,
    colors,
    size,
    tags,
    rating,
    variants,
  } = req.body;
  console.log(req.files, "images");

  var pictures = [];
  console.log(req.files, "images");
  if (req.files.length > 0) {
    console.log(req.files.length);
    pictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  console.log(pictures);
  try {
    const product = new Product({
      name,
      price,
      salePrice,
      discount,
      pictures,
      shortDetails,
      stock,
      sale,
      description,
      category,
      colors,
      size,
      tags,
      rating,
      variants,
    });
    await product.save();
    res.status(201).json({ success: true, message: req.t("productCreated") });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    var products = await Product.find()
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit));
    if (!products) {
      return res.json({
        success: true,
        products: "no product Found",
      });
    }
    return res.json({
      success: true,
      products: products,
    });
  } catch (error) {}
};
exports.getProductById = async (req, res) => {
  try {
    var product = await Product.findById(req.params.id);

    if (!product) {
      console.log(req.t("productCreated"));
      return res.status(400).json({
        success: true,
        product: "no product Found",
      });
    }
    console.log(product);

    return res.json({
      product: product,
    });
  } catch (error) {
    console.log(req.t("productCreated"));

    return res.status(400).json({
      success: true,
      product: "no product Found",
    });
  }
};
exports.UpdateProduct = async (req, res) => {
  try {
    var product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.json({
        success: true,
        product: "no product Found",
      });
    }
    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      product: "no product Found",
    });
  }
};
exports.SearchApi = async (req, res) => {
  console.log(req.query.search);
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    console.log(regex);
    try {
      var products = await Product.find({ name: regex });
      if (!products) {
        return res.json({
          success: true,
          products: "no product Found",
        });
      }
      return res.json({
        success: true,
        products,
      });
    } catch (error) {}
  } else {
    try {
      var products = await Product.find();
      if (!products) {
        return res.json({
          success: true,
          products: "no product Found",
        });
      }
      return res.json({
        success: true,
        products,
      });
    } catch (error) {}
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
