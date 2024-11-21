const mongoose = require("mongoose");

// Định nghĩa schema cho Likelist
const likelistSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});

// Tạo mô hình Likelist với tên mô hình là 'Likelist'
module.exports = mongoose.model("LikeList", likelistSchema);
