const categoryModel = require("../models/category_model");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { NCC, category_name } = req.body;
      const newCategory = new categoryModel({ category_name, NCC });
      const saveCategory = await newCategory.save();
      res.json(saveCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getCategories: async (req, res) => {
    const categories = await categoryModel.find();
    return res.status(200).json(categories);
  },
};
