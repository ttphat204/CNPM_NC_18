const bcrypt = require("bcrypt");
const accountModel = require("../models/account_model");
const Traffic = require("../models/traffic_model"); // Gọi model traffic

module.exports = {
  createAccount: async (req, res) => {
    const { username, name, email, password, phone } = req.body;

    // Validate đầu vào
    if (!username || username.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập phải có ít nhất 4 ký tự.",
      });
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Chỉ chấp nhận email @gmail.com." });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Số điện thoại phải có 10 chữ số." });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu phải có ít nhất 6 ký tự." });
    }

    try {
      // Kiểm tra xem Username đã tồn tại chưa
      const existingUser = await accountModel.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Username đã tồn tại." });
      }

      // Băm mật khẩu với 10 rounds
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo tài khoản mới với mật khẩu đã được băm
      const newAccount = await accountModel.create({
        username,
        name,
        email,
        password: hashedPassword, // Lưu mật khẩu đã được mã hóa
        phone,
      });

      return res.status(201).json({ success: true, account: newAccount });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Tạo tài khoản thất bại." });
    }
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await accountModel.find();
      return res.status(200).json({ success: true, accounts });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi lấy tài khoản." });
    }
  },

  // Phương thức mới để lấy số lượng tài khoản
  getAccountCount: async (req, res) => {
    try {
      const count = await accountModel.countDocuments(); // Đếm số lượng tài khoản
      return res.status(200).json({ count }); // Trả về số lượng tài khoản
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Lấy số lượng tài khoản không thành công: ",
        error: error.message,
      });
    }
  },
};
