const discountModel = require("../models/discount_model");

module.exports = {
  createDiscount: async (req, res) => {
    try {
      const { category, discount, startDate, endDate } = req.body;
      const newDiscount = new discountModel({
        category,
        discount,
        startDate,
        endDate,
      });
      const saveDiscount = await newDiscount.save();
      res.json(saveDiscount);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getDiscounts: async (req, res) => {
    const discounts = await discountModel.find();
    return res.status(200).json(discounts);
  },
};
