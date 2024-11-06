const express = require("express");
const router = express.Router();

const {
  addQuantity,
  reduceQuantity,
  getKho,
} = require("../Controllers/kho_controller");
const { getProducts } = require("../Controllers/product_controller");

router.route("/").get(getKho).get(getProducts);
router.route("/add").patch(addQuantity);
router.route("/add").post(addQuantity);
router.route("/reduce").patch(reduceQuantity);

module.exports = router;
