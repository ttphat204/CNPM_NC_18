const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'], // Kiểm tra định dạng email
  },
});

// Tạo model từ schema
const userModel = mongoose.model('account', accountSchema);

// Xuất model
module.exports = userModel; 
