const mongoose = require("mongoose");

const khoSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("kho", khoSchema);
