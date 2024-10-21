const express = require('express');
const AdminModel = require('../models/Admin.js');
const accountModel = require('../models/account_model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const createToken = (data, key) => {
    return jwt.sign(data, key);
};

module.exports = {
    // Đăng nhập cho admin và user
    login: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Kiểm tra nếu là admin
            const admin = await AdminModel.findOne({ username });
            if (admin) {
                const validPassword = await bcrypt.compare(password, admin.password);
                if (!validPassword) {
                    return res.json({ message: 'Sai mật khẩu' });
                }
                const token = createToken({ username: admin.username, role: admin.role, userId: admin._id }, process.env.Admin_Key);
                res.cookie('token', token, { httpOnly: true, secure: true });
                return res.json({ login: true, role: admin.role, username: admin.username, userId: admin._id });
            }

            // Kiểm tra nếu là user
            const user = await accountModel.findOne({ username });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return res.json({ message: 'Sai mật khẩu' });
                }
                const token = createToken({ username: user.username, role: 'user', userId: user._id }, process.env.User_Key);
                res.cookie('token', token, { httpOnly: true, secure: true });
                return res.json({ login: true, role: 'user', username: user.username, userId: user._id });
            }

            return res.json({ message: 'Người dùng không tồn tại' });
        } catch (er) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: er.message });
        }
    },

    // Xác minh quyền admin
    verifyAdmin: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ message: 'Admin không hợp lệ' });
        } else {
            jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
                if (err) {
                    return res.json({ message: 'Token không hợp lệ' });
                } else {
                    req.username = decoded.username;
                    req.role = decoded.role;
                    if (req.role.startsWith('admin')) {
                        next();
                    } else {
                        return res.json({ message: 'Quyền không hợp lệ' });
                    }
                }
            });
        }
    },

    // Xác minh quyền user
    verifyUser: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ message: 'User không hợp lệ' });
        } else {
            jwt.verify(token, process.env.User_Key, (err, decoded) => {
                if (err) {
                    return res.json({ message: 'Token không hợp lệ' });
                } else {
                    req.username = decoded.username;
                    req.role = decoded.role || 'user';
                    req.userId = decoded.userId;
                    next();
                }
            });
        }
    },

    // Kiểm tra xác thực
    verify: (req, res) => {
        return res.json({ login: true, role: req.role, username: req.username, userId: req.userId });
    },

    // Đăng xuất
    logout: (req, res) => {
        res.clearCookie('token');
        return res.json({ logout: true });
    }
};

// Sử dụng router để quản lý các endpoint
router.post('/login', module.exports.login);
router.get('/verify', module.exports.verifyUser, module.exports.verify);
router.get('/logout', module.exports.logout);

module.exports.AdminRouter = router;
