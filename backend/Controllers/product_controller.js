const productModel = require("../models/product_model");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { category, product_name, price, img, des_product } = req.body;

      if (!category || !product_name || !price || !img) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newProduct = new productModel({
        category,
        product_name,
        price,
        img,
        des_product,
      });

      const saveProduct = await newProduct.save();
      res.json(saveProduct);
    } catch (err) {
      console.log("Error creating product:", err.message); // Kiểm tra chi tiết lỗi
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      console.log("Fetching product with ID:", productId); // Log ID sản phẩm

      const product = await productModel.findById(productId);
      console.log("Product found:", product); // Log sản phẩm đã tìm thấy

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      console.error("Error fetching product details:", err.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
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

  getProductByCategory: async (req, res) => {
    try {
      // Lấy category từ query parameters
      const { category } = req.query;

      // Kiểm tra xem có category hay không
      if (!category) {
        return res
          .status(400)
          .json({ error: "Danh mục sản phẩm không được cung cấp." });
      }

      // Log để kiểm tra giá trị của category
      console.log("Fetching products for category:", category);

      // Truy vấn cơ sở dữ liệu để lấy sản phẩm theo category
      const products = await productModel.find({ category_name: category });

      // Kiểm tra nếu không có sản phẩm nào
      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm trong danh mục này." });
      }

      // Trả về sản phẩm theo danh mục
      res.status(200).json(products);
    } catch (error) {
      // Log chi tiết lỗi để dễ dàng khắc phục
      console.error("Lỗi khi lấy sản phẩm theo danh mục:", error.message);
      res.status(500).json({ error: "Lỗi khi lấy sản phẩm theo danh mục." });
    }
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
