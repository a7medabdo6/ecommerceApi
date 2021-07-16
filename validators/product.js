const { check } = require("express-validator");

exports.ProductValidator = (req, res) => {
  console.log(req);
  return [
    check("name", "Name_is_required").not().isEmpty(),
    check("price", "Please include a vaild email").not().isEmpty(),
    check("salePrice", "Please include a salePrice").not().isEmpty(),
    check("stock", "stock is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("shortDetails", "shortDetails is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("stock", "stock is required").not().isEmpty(),
    check("discount", "discount is required").not().isEmpty(),
  ];
};
