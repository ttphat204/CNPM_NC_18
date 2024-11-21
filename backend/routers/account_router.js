const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtpAndCreateAccount,
  sendOtpForLogin,
  verifyOtpForLogin,
  sendOtpForPasswordReset,
  verifyOtp,
  resetPassword,
} = require("../Controllers/account_controller");

// Đăng ký tài khoản: gửi OTP và xác minh OTP
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndCreateAccount);

// Đăng nhập: gửi OTP và xác minh OTP
router.post("/send-otp-login", sendOtpForLogin);
router.post("/verify-otp-login", verifyOtpForLogin);

// Quên mật khẩu: gửi OTP và thay đổi mật khẩu
router.post("/send-otp-password-reset", sendOtpForPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/verify-otp-password-reset", verifyOtp);

const {
  getUserInfo,
  updateUserInfo,
} = require("../Controllers/account_controller");

// Route để lấy thông tin người dùng
router.route("/info/:id").get(getUserInfo); // GET request để lấy thông tin người dùng

// Route để cập nhật thông tin người dùng
router.route("/info").put(updateUserInfo); // PUT request để cập nhật thông tin người dùng

const {
  createAccount,
  getAccounts,
} = require("../Controllers/account_controller");

// Register
router.route("/list").get(getAccounts);
router.route("/create").post(createAccount);

const {
  getAccountCount, // Nhập phương thức mới
} = require("../Controllers/account_controller"); // Kiểm tra chính tả đường dẫn

// Định nghĩa các route cho tài khoản
router
  .route("/")
  .post(createAccount) // Đường dẫn để tạo tài khoản
  .get(getAccounts); // Đường dẫn để lấy danh sách tài khoản

// Thêm route mới để lấy số lượng tài khoản
router.route("/count").get(getAccountCount); // Đường dẫn để lấy số lượng tài khoản

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   sendOtp,
//   verifyOtpAndCreateAccount,
// } = require("../Controllers/account_controller");

// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtpAndCreateAccount);

// module.exports = router;
