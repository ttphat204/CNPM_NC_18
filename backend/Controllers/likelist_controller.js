const LikeListModel = require("../models/LikeList_model");
const productModel = require("../models/product_model");
const accountModel = require("../models/account_model");

module.exports = {
  // Thêm sản phẩm vào danh sách yêu thích
  addFavorite: async (req, res) => {
    try {
      const { accountId, productId } = req.body;

      // Kiểm tra tài khoản và sản phẩm
      const account = await accountModel.findById(accountId);
      const product = await productModel.findById(productId);

      if (!account || !product) {
        return res.status(404).json({
          success: false,
          message: "Tài khoản hoặc sản phẩm không tồn tại.",
        });
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
      const existingFavorite = await LikeListModel.findOne({
        account: accountId,
        product: productId,
      });

      if (existingFavorite) {
        return res.status(400).json({
          success: false,
          message: "Sản phẩm đã có trong danh sách yêu thích.",
        });
      }

      // Thêm vào danh sách yêu thích
      const newFavorite = new LikeListModel({
        account: accountId,
        product: productId,
      });

      await newFavorite.save();

      res.status(201).json({
        success: true,
        message: "Sản phẩm đã được thêm vào danh sách yêu thích.",
        favorite: newFavorite,
      });
    } catch (error) {
      console.error("Error in addFavorite:", error);
      res
        .status(500)
        .json({ success: false, message: "Có lỗi xảy ra.", error });
    }
  },

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFavorite: async (req, res) => {
    try {
      const { accountId, productId } = req.body; // Lấy cả accountId và productId từ body

      // Kiểm tra nếu thiếu accountId hoặc productId
      if (!accountId || !productId) {
        return res
          .status(400)
          .json({ message: "Thiếu accountId hoặc productId" });
      }

      // Xóa sản phẩm khỏi danh sách yêu thích
      const result = await LikeListModel.deleteOne({
        account: accountId,
        product: productId,
      });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Sản phẩm không có trong danh sách yêu thích" });
      }

      res.json({ message: "Sản phẩm đã được xóa khỏi danh sách yêu thích" });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  },

  // Lấy danh sách yêu thích của người dùng
  getFavorites: async (req, res) => {
    try {
      const { accountId } = req.params;

      // Lấy danh sách yêu thích của người dùng
      const favorites = await LikeListModel.find({
        account: accountId,
      }).populate("product");

      if (favorites.length === 0) {
        return res.status(404).json({ message: "Danh sách yêu thích trống" });
      }

      res.json({ favorites });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  },
};
