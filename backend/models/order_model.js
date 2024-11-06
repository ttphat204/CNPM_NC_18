const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  total_money: {
    type: Number,
    required: true,
    min: 0,
  },
  payment_method: {
    type: String,
    enum: ["COD", "Momo", "Cart Credit"],
    default: "COD",
  },
  is_payment: {
    type: Boolean,
    default: false,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
});

module.exports = mongoose.model("order", orderSchema);
