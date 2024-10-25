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
    default: '', // Thêm giá trị mặc định
  },
  phone: {
    type: String, // Sử dụng String cho số điện thoại
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'], // Kiểm tra định dạng email
  },
  createdAt: {
    type: Date,
    default: Date.now, // Thời gian tạo tài khoản
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Thời gian cập nhật tài khoản
  },
  isActive: {
    type: Boolean,
    default: true, // Trạng thái tài khoản
  },
  date: { // Thêm trường date
    type: Date,
    default: Date.now,
  }
});

// Cập nhật thời gian khi tài khoản được cập nhật
accountSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Account", accountSchema);
