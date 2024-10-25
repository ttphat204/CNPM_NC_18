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
<<<<<<< HEAD
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, name: {
    type: String,
    required: true
=======
    type: Number, // Sử dụng String thay vì Number cho số điện thoại
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'], // Kiểm tra định dạng email
>>>>>>> 52972455daec6ba1d831af5bcb894f39c46fd809
  },
});

// Tạo model từ schema
const userModel = mongoose.model('account', accountSchema);

// Xuất model
module.exports = userModel; 
