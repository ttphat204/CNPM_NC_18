const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controllers/product_controller");
const { getCategories } = require("../Controllers/category_controller");

router.route("/").post(createProduct).get(getProducts).get(getCategories);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;
