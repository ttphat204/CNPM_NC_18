// const express = require("express");
// const router = express.Router();

// const {
//   createAccount,
//   getAccounts,
// } = require("../Controllers/account_controller");

// // Register
// router.route("/list").get(getAccounts);
// router.route("/create").post(createAccount);

// const {
//   getAccountCount, // Nhập phương thức mới
// } = require("../Controllers/account_controller"); // Kiểm tra chính tả đường dẫn

// // Định nghĩa các route cho tài khoản
// router
//   .route("/")
//   .post(createAccount) // Đường dẫn để tạo tài khoản
//   .get(getAccounts); // Đường dẫn để lấy danh sách tài khoản

// // Thêm route mới để lấy số lượng tài khoản
// router.route("/count").get(getAccountCount); // Đường dẫn để lấy số lượng tài khoản

// module.exports = router;





const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtpAndCreateAccount,
} = require("../Controllers/account_controller");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndCreateAccount);

module.exports = router;
