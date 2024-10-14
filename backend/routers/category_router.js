const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../Controllers/category_controller");
const { getNCCs } = require("../Controllers/NCC_controller");

router.route("/").post(createCategory).get(getCategories).get(getNCCs);

module.exports = router;
