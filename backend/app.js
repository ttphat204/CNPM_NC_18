const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./configs/database");
const router = require("./routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
router(app);


//cors
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(5000, () => {
    console.log("Server đang chạy...");
});
