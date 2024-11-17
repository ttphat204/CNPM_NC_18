const express = require("express");
const AdminModel = require("../models/Admin");
const account = require("../models/account_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require("express-session"); // Cài đặt session

const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

// Cấu hình session
router.use(
  session({
    secret: "your-session-secret", // Thay bằng một secret phức tạp
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đảm bảo khi chạy trên https, set secure: true
  })
);

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await AdminModel.findOne({ username });
    if (admin) {
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      // Lưu thông tin vào session thay vì cookie
      req.session.user = {
        username: admin.username,
        role: admin.role,
        userId: admin._id,
      };

      return res.json({
        login: true,
        role: admin.role,
        username: admin.username,
        userId: admin._id,
      });
    }

    const user = await account.findOne({ username });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      // Lưu thông tin vào session thay vì cookie
      req.session.user = {
        username: user.username,
        role: "user",
        userId: user._id,
      };

      return res.json({
        login: true,
        role: "user",
        username: user.username,
        userId: user._id,
      });
    }

    return res.status(404).json({ message: "Người dùng không tồn tại" });
  } catch (er) {
    res.status(500).json({ message: "Lỗi máy chủ", error: er.message });
  }
};

// Đăng xuất
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Không thể đăng xuất" });
    }
    return res.json({ logout: true });
  });
};

// Middleware kiểm tra xác thực người dùng qua session
const verifyUser = (req, res, next) => {
  if (!req.session.user) {
    return res.json({ message: "User không hợp lệ" });
  } else {
    req.username = req.session.user.username;
    req.role = req.session.user.role || "user";
    req.userId = req.session.user.userId;
    next();
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({
    login: true,
    role: req.role,
    username: req.username,
    userId: req.userId,
  });
});

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
