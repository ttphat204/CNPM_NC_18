// const bcrypt = require("bcrypt");
// const accountModel = require("../models/account_model");
// const nodemailer = require("nodemailer");

// const otpStore = {};

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "haoquang16122004@gmail.com",
//     pass: "bzpv nzql mfmd phoh",
//   },
// });

// module.exports = {
//   // Gửi OTP
//   sendOtp: async (req, res) => {
//     const { email } = req.body;
//     console.log("Received request body for sendOtp:", req.body);

//     const emailRegex = /^[^\s@]+@gmail\.com$/;
//     if (!email || !emailRegex.test(email)) {
//       console.log("Email validation failed:", email);
//       return res
//         .status(400)
//         .json({ success: false, message: "Chỉ chấp nhận email @gmail.com." });
//     }

//     try {

//       const existingUser = await accountModel.findOne({ email });
//       if (existingUser) {
//         console.log("Email already exists:", existingUser);
//         return res.status(400).json({
//           success: false,
//           message: "Email đã tồn tại.",
//         });
//       }

//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       console.log("Generated OTP:", otp);

//       otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

//       console.log("Sending OTP to email:", email);
//       await transporter.sendMail({
//         from: "haoquang16122004@gmail.com",
//         to: email,
//         subject: "OTP đăng ký tài khoản",
//         text: `Mã OTP của bạn là: ${otp}`,
//         html: `<b>Mã OTP của bạn là: ${otp}</b>`,
//       });

//       console.log(`OTP sent successfully to ${email}`);
//       return res.status(200).json({
//         success: true,
//         message: "OTP đã được gửi đến email của bạn.",
//       });
//     } catch (error) {
//       console.error("Error while sending OTP:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Không thể gửi OTP.",
//       });
//     }
//   },

//   // Xác minh OTP và tạo tài khoản
//   verifyOtpAndCreateAccount: async (req, res) => {
//     const { email, otp, username, name, password, phone } = req.body;
//     console.log("Received request body for verifyOtpAndCreateAccount:", req.body);

//     if (!email || !otp) {
//       console.log("Email or OTP missing:", { email, otp });
//       return res.status(400).json({
//         success: false,
//         message: "Email và OTP là bắt buộc.",
//       });
//     }

//     const storedOtp = otpStore[email];
//     if (!storedOtp) {
//       console.log("OTP not found or expired for email:", email);
//       return res.status(400).json({
//         success: false,
//         message: "OTP không tồn tại hoặc đã hết hạn.",
//       });
//     }

//     if (storedOtp.otp !== otp) {
//       console.log("OTP mismatch:", { received: otp, expected: storedOtp.otp });
//       return res.status(400).json({
//         success: false,
//         message: "OTP không hợp lệ.",
//       });
//     }

//     if (Date.now() > storedOtp.expires) {
//       console.log("OTP expired for email:", email);
//       delete otpStore[email];
//       return res.status(400).json({
//         success: false,
//         message: "OTP đã hết hạn.",
//       });
//     }

//     try {
//       // Xóa OTP sau khi xác minh
//       delete otpStore[email];
//       console.log("OTP verified, proceeding to create account...");

//       // Băm mật khẩu và tạo tài khoản
//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("Password hashed successfully.");

//       const newAccount = await accountModel.create({
//         username,
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         isVerified: true, // Đánh dấu là đã xác minh
//       });

//       console.log("Account created successfully:", newAccount);
//       return res.status(201).json({
//         success: true,
//         message: "Đăng ký thành công.",
//         account: newAccount,
//       });
//     } catch (error) {
//       console.error("Error while creating account:", error); // Debug error
//       return res.status(500).json({
//         success: false,
//         message: "Không thể tạo tài khoản.",
//       });
//     }
//   },
// };

const bcrypt = require("bcrypt");
const accountModel = require("../models/account_model");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const orderModel = require("../models/order_model");

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haoquang16122004@gmail.com",
    pass: "bzpv nzql mfmd phoh",
  },
});

module.exports = {
  // Gửi OTP khi đăng ký tài khoản
  sendOtp: async (req, res) => {
    const { email } = req.body;
    console.log("Received request body for sendOtp:", req.body);

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!email || !emailRegex.test(email)) {
      console.log("Email validation failed:", email);
      return res
        .status(400)
        .json({ success: false, message: "Chỉ chấp nhận email @gmail.com." });
    }

    try {
      const existingUser = await accountModel.findOne({ email });
      if (existingUser) {
        console.log("Email already exists:", existingUser);
        return res.status(400).json({
          success: false,
          message: "Email đã tồn tại.",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Generated OTP:", otp);

      otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

      console.log("Sending OTP to email:", email);
      await transporter.sendMail({
        from: "haoquang16122004@gmail.com",
        to: email,
        subject: "OTP đăng ký tài khoản",
        text: `Mã OTP của bạn là: ${otp}`,
        html: `<b>Mã OTP của bạn là: ${otp}</b>`,
      });

      console.log(`OTP sent successfully to ${email}`);
      return res.status(200).json({
        success: true,
        message: "OTP đã được gửi đến email của bạn.",
      });
    } catch (error) {
      console.error("Error while sending OTP:", error);
      return res.status(500).json({
        success: false,
        message: "Không thể gửi OTP.",
      });
    }
  },

  // Xác minh OTP và tạo tài khoản
  verifyOtpAndCreateAccount: async (req, res) => {
    const { email, otp, username, name, password, phone } = req.body;
    console.log(
      "Received request body for verifyOtpAndCreateAccount:",
      req.body
    );

    if (!email || !otp) {
      console.log("Email or OTP missing:", { email, otp });
      return res.status(400).json({
        success: false,
        message: "Email và OTP là bắt buộc.",
      });
    }

    const storedOtp = otpStore[email];
    if (!storedOtp) {
      console.log("OTP not found or expired for email:", email);
      return res.status(400).json({
        success: false,
        message: "OTP không tồn tại hoặc đã hết hạn.",
      });
    }

    if (storedOtp.otp !== otp) {
      console.log("OTP mismatch:", { received: otp, expected: storedOtp.otp });
      return res.status(400).json({
        success: false,
        message: "OTP không hợp lệ.",
      });
    }

    if (Date.now() > storedOtp.expires) {
      console.log("OTP expired for email:", email);
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "OTP đã hết hạn.",
      });
    }

    try {
      delete otpStore[email];
      console.log("OTP verified, proceeding to create account...");

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully.");

      const newAccount = await accountModel.create({
        username,
        name,
        email,
        password: hashedPassword,
        phone,
        isVerified: true, // Đánh dấu là đã xác minh
      });

      console.log("Account created successfully:", newAccount);
      return res.status(201).json({
        success: true,
        message: "Đăng ký thành công.",
        account: newAccount,
      });
    } catch (error) {
      console.error("Error while creating account:", error);
      return res.status(500).json({
        success: false,
        message: "Không thể tạo tài khoản.",
      });
    }
  },

  // Gửi OTP khi đăng nhập
  sendOtpForLogin: async (req, res) => {
    const { email } = req.body;
    console.log("Received request body for sendOtpForLogin:", req.body);

    const existingUser = await accountModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email không tồn tại.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP for login:", otp);

    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    try {
      console.log("Sending OTP to email:", email);
      await transporter.sendMail({
        from: "haoquang16122004@gmail.com",
        to: email,
        subject: "OTP đăng nhập",
        text: `Mã OTP của bạn để đăng nhập là: ${otp}`,
        html: `<b>Mã OTP của bạn để đăng nhập là: ${otp}</b>`,
      });

      console.log(`OTP sent successfully to ${email}`);
      return res.status(200).json({
        success: true,
        message: "OTP đã được gửi đến email của bạn.",
      });
    } catch (error) {
      console.error("Error while sending OTP for login:", error);
      return res.status(500).json({
        success: false,
        message: "Không thể gửi OTP.",
      });
    }
  },

  // Xác minh OTP khi đăng nhập
  verifyOtpForLogin: async (req, res) => {
    const { email, otp } = req.body;
    console.log("Received request body for verifyOtpForLogin:", req.body);

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email và OTP là bắt buộc.",
      });
    }

    const storedOtp = otpStore[email];
    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP không tồn tại hoặc đã hết hạn.",
      });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP không hợp lệ.",
      });
    }

    if (Date.now() > storedOtp.expires) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "OTP đã hết hạn.",
      });
    }

    delete otpStore[email];
    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công.",
    });
  },

  // Gửi OTP khi quên mật khẩu
  sendOtpForPasswordReset: async (req, res) => {
    const { email } = req.body;
    console.log("Received request body for sendOtpForPasswordReset:", req.body);

    const existingUser = await accountModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email không tồn tại.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP for password reset:", otp);

    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    try {
      console.log("Sending OTP for password reset to email:", email);
      await transporter.sendMail({
        from: "haoquang16122004@gmail.com",
        to: email,
        subject: "OTP quên mật khẩu",
        text: `Mã OTP của bạn để thay đổi mật khẩu là: ${otp}`,
        html: `<b>Mã OTP của bạn để thay đổi mật khẩu là: ${otp}</b>`,
      });

      console.log(`OTP sent successfully to ${email}`);
      return res.status(200).json({
        success: true,
        message: "OTP đã được gửi đến email của bạn.",
      });
    } catch (error) {
      console.error("Error while sending OTP for password reset:", error);
      return res.status(500).json({
        success: false,
        message: "Không thể gửi OTP.",
      });
    }
  },

  resetPassword: async (req, res) => {
    const { email, newPassword } = req.body;

    console.log("Received request body for resetPassword:", req.body);

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email và mật khẩu mới là bắt buộc.",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Password hashed successfully.");

      const updatedUser = await accountModel.updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );

      console.log("Password reset successfully:", updatedUser);

      return res.status(200).json({
        success: true,
        message: "Mật khẩu đã được thay đổi thành công.",
      });
    } catch (error) {
      console.error("Error while resetting password:", error);
      return res.status(500).json({
        success: false,
        message: "Không thể thay đổi mật khẩu.",
      });
    }
  },
  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;

    console.log("Received request body for verifyOtp:", req.body);

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email và OTP là bắt buộc.",
      });
    }

    const storedOtp = otpStore[email];
    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP không tồn tại hoặc đã hết hạn.",
      });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP không hợp lệ.",
      });
    }

    if (Date.now() > storedOtp.expires) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "OTP đã hết hạn.",
      });
    }

    // Xóa OTP sau khi xác minh thành công
    delete otpStore[email];

    return res.status(200).json({
      success: true,
      message: "Xác minh OTP thành công.",
    });
  },

  createAccount: async (req, res) => {
    const { username, name, email, password, phone } = req.body;

    // Validate đầu vào
    if (!username || username.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập phải có ít nhất 4 ký tự.",
      });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Tên không được để trống.",
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
  // Phương thức lấy thông tin người dùng
  getUserInfo: async (req, res) => {
    const accountId = req.params.account_id;

    // Kiểm tra xem accountId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).send("Invalid accountId");
    }

    try {
      const objectId = new mongoose.Types.ObjectId(accountId);

      // Tìm kiếm thông tin người dùng
      const user = await accountModel.findById(objectId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Tìm kiếm lịch sử đơn hàng dựa trên accountId
      const orders = await orderModel.find({ accountId: objectId });

      // Trả về thông tin người dùng cùng lịch sử đơn hàng
      res.status(200).json({
        success: true,
        user,
        orders,
      });
    } catch (error) {
      console.error(error.message || error); // In lỗi chi tiết
      res.status(500).json({
        success: false,
        message: "Server error: " + (error.message || error),
      });
    }
  },

  // Phương thức cập nhật thông tin người dùng
  updateUserInfo: async (req, res) => {
    const { name, phone } = req.body;
    try {
      const user = await accountModel.findByIdAndUpdate(
        req.userId,
        { name, phone },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error updating user info." });
    }
  },
};
