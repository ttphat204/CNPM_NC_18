const express = require("express");
const router = express.Router();

const { createOrder } = require("../Controllers/order_controller");

router.route("/").post(createOrder);

module.exports = router;
