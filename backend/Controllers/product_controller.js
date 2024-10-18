const productModel = require("../models/product_model");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const {
        category,
        product_name,
        price,
        img,
        des_product,
        discount,
        newPrice,
      } = req.body;
      const newProduct = new productModel({
        category,
        product_name,
        price,
        img,
        des_product,
        discount,
        newPrice,
      });
      const saveProduct = await newProduct.save();
      res.json(saveProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProducts: async (req, res) => {
    const category_id = req.query.category_id;
    const body_query = {};
    if (category_id) {
      body_query.category_id = category_id;
    }
    const products = await productModel.find(body_query).populate("category");
    return res.status(200).json(products);
  },
  updateProduct: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedProduct);
  },
  deleteProduct: async (req, res) => {
    const id = req.params.id;
    const deleteProduct = await productModel.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  },
};
