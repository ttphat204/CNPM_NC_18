const Kho = require("../models/kho_model");
const product = require("../models/product_model");

module.exports = {
  //Thêm số lượng sản phẩm
  addQuantity: async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      let item = await Kho.findOne({ product: productId });
      if (item) {
        item.quantity += quantity;
      } else {
        item = new Kho({ product: productId, quantity });
      }
      await item.save();
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm số lượng sản phẩm" });
    }
  },

  // Giảm số lượng sản phẩm sau khi mua
  reduceQuantity: async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      const item = await Kho.findOne({ product: productId });
      if (!item || item.quantity < quantity) {
        return res.status(400).json({ message: "Sản phẩm không đủ hàng" });
      }
      item.quantity -= quantity;
      await item.save();
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi giảm số lượng sản phẩm" });
    }
  },

  // Lấy thông tin của kho
  getKho: async (req, res) => {
    try {
      const kho = await Kho.find().populate("product");
      res.json(kho);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Lỗi khi lấy thông tin kho" });
    }
  },

  getProductWithQuantity: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const kho = await Kho.findOne({ product: product._id });
      const quantity = kho ? kho.quantity : 0;
      res.json({ ...product.toObject(), quantity });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },
};
