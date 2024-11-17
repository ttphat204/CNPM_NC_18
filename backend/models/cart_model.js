const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total_money: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = mongoose.model("cart", cartSchema);
