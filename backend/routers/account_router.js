const express = require("express");
const router = express.Router();

const {
  createAccount,
  getAccounts,
  getAccountCount, // Nhập phương thức mới
} = require("../controllers/account_controller"); // Kiểm tra chính tả đường dẫn

// Định nghĩa các route cho tài khoản
router.route("/")
  .post(createAccount)  // Đường dẫn để tạo tài khoản
  .get(getAccounts);    // Đường dẫn để lấy danh sách tài khoản

// Thêm route mới để lấy số lượng tài khoản
router.route("/count")
  .get(getAccountCount); // Đường dẫn để lấy số lượng tài khoản

module.exports = router;
