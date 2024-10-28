const Promotion = require('../models/KhuyenMai.js'); 
const productModel = require("../models/product_model");
const categoryModel = require("../models/category_model");
module.exports = {
createPromotion : async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { code, discount, categoryId, startDate, endDate } = req.body;

    const categoryData = await categoryModel.findById(categoryId);
    if (!categoryData) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newPromotion = new Promotion({
      code,
      discount,
      category: categoryId,
      startDate,
      endDate
    });
    const savedPromotion = await newPromotion.save();

    // Cập nhật giá mới cho các sản phẩm trong danh mục
    const products = await productModel.find({ category: categoryId });
    await Promise.all(products.map(async (prod) => {
      try {
        // Tính toán giá mới dựa trên mức giảm giá
        const newPrice = prod.price - (prod.price * discount / 100);
        // Đảm bảo rằng chúng ta đang đặt giá trị giảm giá đúng
        const updatedDiscount = discount > 0 ? discount : 0; // Bạn có thể tùy chỉnh logic này dựa trên yêu cầu của bạn
    
        console.log(`Updating product ${prod._id} with newPrice: ${newPrice} and discount: ${updatedDiscount}`);
        // Cập nhật sản phẩm với giá mới và giảm giá
        await productModel.findByIdAndUpdate(prod._id, { newPrice, discount: updatedDiscount });
      } catch (err) {
        console.error(`Failed to update product ${prod._id}:`, err.message);
      }
    }));
    

    res.json(savedPromotion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

 getPromotionByCategory : async (req, res) => {
  try {
    const { categoryId } = req.params;
    const promotions = await Promotion.find({ category: categoryId }); // Sửa 'promotion' thành 'Promotion'
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
};
