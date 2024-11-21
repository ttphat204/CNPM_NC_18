const cartModel = require("../models/cart_model");

module.exports = {
  AddToCart: async (req, res) => {
    const { account_id, product_id, quantity } = req.body;
    console.log("Adding to cart", account_id, product_id, quantity); // In ra để kiểm tra dữ liệu

    try {
      let cart = await cartModel.findOne({ account_id });

      if (!cart) {
        // Nếu chưa có giỏ hàng, tạo mới
        cart = await cartModel.create({
          account_id,
          items: [{ product: product_id, quantity: quantity || 1 }],
        });
      } else {
        // Nếu giỏ hàng đã có, kiểm tra xem sản phẩm đã có trong giỏ chưa
        const itemIndex = cart.items.findIndex(
          (item) => item.product.toString() === product_id
        );

        if (itemIndex > -1) {
          // Nếu sản phẩm đã có, cập nhật số lượng
          cart.items[itemIndex].quantity += quantity || 1;
        } else {
          // Nếu chưa có, thêm sản phẩm mới vào giỏ
          cart.items.push({ product: product_id, quantity: quantity || 1 });
        }
        await cart.save();
      }

      return res.status(201).json(cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  GetCart: async (req, res) => {
    const account_id = req.params.account_id;
    const cart = await cartModel
      .findOne({
        // is_order: false,
        account_id: account_id,
      })
      .populate("items.product");

    return res.status(200).json(cart || {});
  },
  // DeleteItem: async (req, res) => {
  //   const account_id = req.params.account_id;
  //   const item_id = req.params.item_id;
  //   let cart = await cartModel.findOne({
  //     account_id: account_id,
  //   });

  //   const items = cart.items.filter((v) => v._id != item_id);
  //   cart = await cartModel.findByIdAndUpdate(
  //     cart._id,
  //     { items },
  //     { new: true }
  //   );

  //   return res.status(200).json(cart);
  // },
  UpdateItem: async (req, res) => {
    const { account_id, item_id } = req.params;
    const { quantity } = req.body;

    try {
      let cart = await cartModel.findOne({ account_id: account_id });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Cập nhật số lượng
      cart.items = cart.items.map((item) => {
        if (item._id.toString() === item_id) {
          item.quantity = quantity;
        }
        return item;
      });

      // Lưu lại giỏ hàng
      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  removeItem: async (req, res) => {
    try {
      // Tìm giỏ hàng của tài khoản
      const cart = await cartModel.findOne({
        account_id: req.params.account_id,
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Xóa sản phẩm khỏi giỏ hàng
      cart.items = cartModel.filter(
        (item) => item._id.toString() !== req.params.item_id
      );

      // Lưu lại giỏ hàng
      await cart.save();

      return res
        .status(200)
        .json({ message: "Item removed successfully", cart });
    } catch (error) {
      console.error("Error removing item:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
