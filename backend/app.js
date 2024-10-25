const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/database");
const router = require("./routers");
require('dotenv').config();

const app = express();
<<<<<<< HEAD

// Middleware
app.use(cors({
    origin: process.env.REACT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

=======
const cors = require("cors");
const connectDB = require("./configs/database");
const router = require("./routers");

app.use(
  cors({
    origin: "http://localhost:5173", // Thay đổi thành địa chỉ frontend của bạn
    methods: ["GET", "POST"], // Bạn có thể thêm các phương thức HTTP mà bạn muốn cho phép
    allowedHeaders: ["Content-Type", "Authorization"], // Thêm các header mà bạn cần
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
>>>>>>> 52972455daec6ba1d831af5bcb894f39c46fd809

// Kết nối đến cơ sở dữ liệu
connectDB();

// Sử dụng router
router(app);

app.listen(5000, () => {
<<<<<<< HEAD
    console.log("Server đang chạy trên cổng 5000...");
=======
  console.log("Server đang chạy...");
>>>>>>> 52972455daec6ba1d831af5bcb894f39c46fd809
});
