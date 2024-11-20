const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getOrderByAccount,
  getOrderDetails,
} = require("../Controllers/order_controller");

router.route("/").get(getOrder).post(createOrder);
router.route("/:account_id").get(getOrderByAccount);
router.route("/details/:orderId").get(getOrderDetails);

module.exports = router;
