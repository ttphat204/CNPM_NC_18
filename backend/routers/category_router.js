const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../Controllers/category_controller");
const { getNCCs } = require("../Controllers/NCC_controller");

router.route("/").post(createCategory).get(getCategories).get(getNCCs);
router.route("/").patch(updateCategory).delete(deleteCategory);

module.exports = router;
