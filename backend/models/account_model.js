const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: Number, // Sử dụng String thay vì Number cho số điện thoại
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'], // Kiểm tra định dạng email
  },
});

module.exports = mongoose.model("account", accountSchema);
