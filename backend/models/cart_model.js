const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  is_order: {
    type: Boolean,
    default: false,
  },
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
});

module.exports = mongoose.model("cart", cartSchema);
