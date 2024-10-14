const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
} = require("../Controllers/product_controller");
const { getCategories } = require("../Controllers/category_controller");

router.route("/").post(createProduct).get(getProducts).get(getCategories);

module.exports = router;
