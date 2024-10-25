const accountModel = require("../models/account_model");
const Traffic = require("../models/traffic_model"); // Gọi model traffic

module.exports = {
  createAccount: async (req, res) => {
    try {
      const body = req.body;
      
      // Tạo tài khoản mới
      const newAccount = await accountModel.create(body);
      
      // Lưu lại thông tin traffic
      const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại

      // Cập nhật traffic hoặc tạo mới cho ngày hiện tại
      await Traffic.updateOne(
        { date: currentDate }, // Kiểm tra xem đã có traffic cho ngày hiện tại chưa
        { $inc: { newAccounts: 1 } }, // Tăng số lượng tài khoản mới lên 1
        { upsert: true } // Nếu chưa có traffic cho ngày này thì tạo mới
      );
      
      // Trả về tài khoản mới được tạo
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
