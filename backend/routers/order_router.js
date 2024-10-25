const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getOrderByAccount,
} = require("../Controllers/order_controller");

router.route("/").get(getOrder).post(createOrder);
router.route("/:account_id").get(getOrderByAccount);

module.exports = router;
