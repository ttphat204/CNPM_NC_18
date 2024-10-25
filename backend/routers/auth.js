const express = require('express');
const AdminModel = require('../models/Admin');
const account = require('../models/account_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();


// Đăng nhập cho admin và user
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra nếu là admin
        const admin = await AdminModel.findOne({ username });
        if (admin) {
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }
            const token = jwt.sign({ username: admin.username, role: admin.role, userId: admin._id }, process.env.ADMIN_KEY);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: admin.role, username: admin.username, userId: admin._id });
        }

        // Kiểm tra nếu là user
        const user = await account.findOne({ username });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }
            const token = jwt.sign({ username: user.username, role: 'user', userId: user._id }, process.env.USER_KEY);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'user', username: user.username, userId: user._id });
        }

        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    } catch (er) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: er.message });
    }
};

// Đăng xuất
const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
};

// Xác minh quyền admin và user (nếu cần)
const verifyAdmin = (req, res, next) => { /*...*/ };
const verifyUser = (req, res, next) => { /*...*/ };

// Sử dụng router để quản lý các endpoint
router.post('/login', login);
router.get('/logout', logout);

module.exports = router; // Xuất khẩu router
