const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByCategory,
} = require("../Controllers/product_controller");
const { getCategories } = require("../Controllers/category_controller");

router
  .route("/")
  .post(createProduct)
  .get(getProducts)
  .get(getProductByCategory);
router.route("/products").get(getCategories);
router
  .route("/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getProductById);
// router.route("/products/category").get(getProductByCategory);

module.exports = router;
