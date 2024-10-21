const bcrypt = require("bcrypt");
const accountModel = require("../models/account_model");

module.exports = {
  createAccount: async (req, res) => {
    const { username, name, email, password, phone } = req.body;

    try {
      // Băm mật khẩu với 10 rounds
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo tài khoản mới với mật khẩu đã được băm
      const newAccount = await accountModel.create({
        username,
        name,
        email,
        password: hashedPassword,  // Lưu mật khẩu đã được mã hóa
        phone
      });

      return res.status(201).json({ success: true, account: newAccount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Tạo tài khoản thất bại." });
    }
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await accountModel.find();
      return res.status(200).json({ success: true, accounts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Lỗi khi lấy tài khoản." });
    }
  },
};
