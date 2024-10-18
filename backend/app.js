const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require("./configs/database")
const router = require("./routers")

app.use(cors({
  origin: 'http://localhost:5173', // Thay đổi thành địa chỉ frontend của bạn
  methods: ['GET', 'POST'], // Bạn có thể thêm các phương thức HTTP mà bạn muốn cho phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Thêm các header mà bạn cần
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


connectDB();
router(app);

app.listen(5000, () => {
    console.log("Server đang chạy...");
})