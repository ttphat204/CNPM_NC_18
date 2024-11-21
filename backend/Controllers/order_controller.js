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
    const accountId = req.params.account_id;
    try {
      const orders = await orderModel.find({ customer: accountId });
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders", error);
      return res.status(500).json({ message: "Error fetching orders", error });
    }
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

  getOrderSummary: async (req, res) => {
    try {
      const totalOrders = await orderModel.countDocuments();

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Tính thời gian tháng trước
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousMonthYear =
        currentMonth === 0 ? currentYear - 1 : currentYear;

      // Lấy doanh thu tháng trước
      const previousMonthOrders = await orderModel
        .find({
          date: {
            $gte: new Date(previousMonthYear, previousMonth, 1),
            $lt: new Date(previousMonthYear, previousMonth + 1, 1),
          },
        })
        .populate({
          path: "items.product_id",
          select: "price",
        });

      let totalRevenue = 0;
      let currentMonthRevenue = 0;
      let previousMonthRevenue = 0;

      // Tính doanh thu
      const allOrders = await orderModel.find().populate("items.product_id");
      allOrders.forEach((order) => {
        order.items.forEach((item) => {
          const revenue = item.product_id.price * item.quantity;
          totalRevenue += revenue;
        });
      });

      // Tính doanh thu tháng hiện tại
      const currentMonthOrders = await orderModel
        .find({
          date: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        })
        .populate("items.product_id");

      currentMonthOrders.forEach((order) => {
        order.items.forEach((item) => {
          currentMonthRevenue += item.product_id.price * item.quantity;
        });
      });

      // Tính doanh thu tháng trước
      previousMonthOrders.forEach((order) => {
        order.items.forEach((item) => {
          previousMonthRevenue += item.product_id.price * item.quantity;
        });
      });

      return res.status(200).json({
        totalOrders,
        totalRevenue,
        currentMonthRevenue,
        previousMonthRevenue,
      });
    } catch (error) {
      console.error("Error fetching order summary:", error);
      return res
        .status(500)
        .json({ message: "Error fetching order summary", error });
    }
  },
};
