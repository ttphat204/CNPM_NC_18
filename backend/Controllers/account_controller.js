const accountModel = require("../models/account_model");

module.exports = {
  createAccount: async (req, res) => {
    try {
      const body = req.body;
      const newAccount = await accountModel.create(body);
      return res.status(201).json(newAccount);
    } catch (error) {
      // Xử lý lỗi và trả về thông báo phù hợp
      return res.status(400).json({ message: "Tạo tài khoản thất bại: ", error: error.message });
    }
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await accountModel.find();
      return res.status(200).json(accounts);
    } catch (error) {
      // Xử lý lỗi và trả về thông báo phù hợp
      return res.status(500).json({ message: "Lấy thông tin tài khoản không thành công: ", error: error.message });
    }
  },

  // Phương thức mới để lấy số lượng tài khoản
  getAccountCount: async (req, res) => {
    try {
      const count = await accountModel.countDocuments(); // Đếm số lượng tài khoản
      return res.status(200).json({ count }); // Trả về số lượng tài khoản
    } catch (error) {
      // Xử lý lỗi và trả về thông báo phù hợp
      return res.status(500).json({ message: "Lấy số lượng tài khoản không thành công: ", error: error.message });
    }
  },
};
