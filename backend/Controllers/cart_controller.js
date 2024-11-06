const cartModel = require("../models/cart_model");

module.exports = {
  AddToCart: async (req, res) => {
    const { account_id, product_id, quantity } = req.body;
    let cart = await cartModel.findOne({
      account_id: account_id,
      // is_order: false,
    });

    //nếu lần đầu thêm vào giỏ hàng
    if (!cart) {
      cart = await cartModel.create({
        account_id: account_id,
        items: [{ product: product_id, quantity: quantity || 1 }],
      });
    } else {
      const items = cart.items;
      const isExists = items.find((v) => v.product == product_id);
      if (isExists) {
        const items2 = items.map((v) => {
          if (v.product == product_id) {
            v.quantity++;
          }
          return v;
        });
        cart = await cartModel.findByIdAndUpdate(
          cart._id,
          { items2 },
          // { new: true }
        );
      } else {
        items.push({ product: product_id, quantity: quantity || 1 });
      }
      cart = await cartModel.findByIdAndUpdate(
        cart._id,
        { items },
        // { new: true }
      );
    }

    return res.status(201).json(cart);
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
  DeleteItem: async (req, res) => {
    const account_id = req.params.account_id;
    const item_id = req.params.item_id;
    let cart = await cartModel.findOne({

      account_id: account_id,
    });

    const items = cart.items.filter((v) => v._id != item_id);
    cart = await cartModel.findByIdAndUpdate(
      cart._id,
      { items },
      { new: true }
    );

    return res.status(200).json(cart);
  },
  UpdateItem: async (req, res) => {
    const account_id = req.params.account_id;
    const item_id = req.params.item_id;
    const quantity = req.body.quantity;
    let cart = await cartModel.findOne({

      account_id: account_id,
    });

    const items = cart.items.map((v) => {
      if (v._id == item_id) {
        //update
        v.quantity = quantity;
      }
      return v;
    });

    cart = await cartModel.findByIdAndUpdate(
      cart._id,
      { items },
      { new: true }
    );

    return res.status(200).json(cart);
  },
};
