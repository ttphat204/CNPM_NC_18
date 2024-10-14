const mongoose = require("mongoose");

const NCCSchema = mongoose.Schema({
  NCC_name: {
    type: String,
    required: true,
  },
  NCC_phone: {
    type: Number,
    required: true,
  },
  NCC_address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("NCC", NCCSchema);
