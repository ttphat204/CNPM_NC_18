const orderModel = require("../models/order_model");
const cartModel = require("../models/cart_model");

module.exports = {
  createOrder: async (req, res) => {
    const body = req.body;
    const order = await orderModel.create(body);
    await cartModel.findByIdAndUpdate(body.cart_id, { is_order: true });

    return res.status(201).json(order);
  },
};