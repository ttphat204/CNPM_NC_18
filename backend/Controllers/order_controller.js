const orderModel = require("../models/order_model");
const cartModel = require("../models/cart_model");

module.exports = {
  createOrder: async (req, res) => {
    const { customer, address, phone, payment_method, cart_items, date, time } =
      req.body;

    try {
      if (!cart_items || cart_items.length === 0) {
        return res.status(400).json({ message: "Giỏ hàng trống!" });
      }

      // Tạo đơn hàng với date và time (time là String)
      const newOrder = await orderModel.create({
        customer,
        address,
        phone,
        payment_method,
        date, // Thêm trường date
        time, // Thêm trường time (đảm bảo đây là String)
        items: cart_items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      });

      // Xóa giỏ hàng của tài khoản sau khi đặt hàng
      await cartModel.deleteMany({ account_id: req.account_id });

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Error creating order", error });
    }
  },

  getOrder: async (req, res) => {
    const { customer, address, phone, date, time } = req.query;

    // Tạo query linh động theo các trường được cung cấp
    const body_query = {};
    if (customer) {
      body_query.customer = { $regex: ".*" + customer + ".*", $options: "i" }; // Tìm kiếm không phân biệt chữ hoa/thường
    }
    if (address) {
      body_query.address = { $regex: ".*" + address + ".*", $options: "i" };
    }
    if (phone) {
      body_query.phone = phone;
    }
    if (date) {
      body_query.date = date; // Tìm kiếm theo ngày
    }
    if (time) {
      body_query.time = time; // Tìm kiếm theo giờ (đảm bảo time là String)
    }

    try {
      // Tìm các đơn hàng theo query và populate dữ liệu sản phẩm
      const orders = await orderModel.find(body_query).populate({
        path: "items.product_id", // Populate thông tin sản phẩm trong danh sách items
        select: "product_name price img", // Lựa chọn các trường cần thiết
      });

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: "Error fetching orders", error });
    }
  },

  getOrderByAccount: async (req, res) => {
    const account_id = req.params.account_id;
    const carts = await cartModel.find({ account_id });

    const orders = [];
    for (let cart of carts) {
      const order = await orderModel
        .findOne({
          cart_id: cart._id,
        })
        .populate({
          path: "cart_id",
          populate: [
            {
              path: "account_id",
            },
            {
              path: "items.product",
            },
          ],
        });
      orders.push(order);
    }

    return res.status(200).json(orders);
  },
  getOrderDetails: async (req, res) => {
    const { orderId } = req.params;

    try {
      // Tìm đơn hàng theo ID và populate dữ liệu sản phẩm
      const order = await orderModel.findById(orderId).populate({
        path: "items.product_id", // Populate thông tin sản phẩm
        select: "product_name price img", // Chỉ lấy các trường cần thiết
      });

      if (!order) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
      return res
        .status(500)
        .json({ message: "Error fetching order details", error });
    }
  },
};
