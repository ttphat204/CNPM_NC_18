const express = require("express");
const AdminModel = require("../models/Admin");
const account = require("../models/account_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await AdminModel.findOne({ username });
    if (admin) {
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }
      const token = jwt.sign(
        { username: admin.username, role: admin.role, userId: admin._id },
        process.env.ADMIN_KEY
      );
      res.cookie("token", token, { httpOnly: true, secure: false });
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
      const token = jwt.sign(
        { username: user.username, role: "user", userId: user._id },
        process.env.USER_KEY
      );
      res.cookie("token", token, { httpOnly: true, secure: false });
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
  res.clearCookie("token");
  return res.json({ logout: true });
};
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "User không hợp lệ" });
  } else {
    jwt.verify(token, process.env.User_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Token không hợp lệ" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role || "user";
        req.userId = decoded.userId;
        next();
      }
    });
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
