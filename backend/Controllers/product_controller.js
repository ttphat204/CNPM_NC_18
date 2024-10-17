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
    const products = await productModel.find();
    return res.status(200).json(products);
  },
};
thien;
