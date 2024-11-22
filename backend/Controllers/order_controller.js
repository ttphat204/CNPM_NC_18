const orderModel = require("../models/order_model");
const cartModel = require("../models/cart_model");
const productModel = require("../models/product_model");
const { deleteCart } = require("./cart_controller");
const Kho = require("../models/kho_model");
module.exports = {
  createOrder: async (req, res) => {
    const { customer, address, phone, payment_method, cart_items, date, time } =
      req.body;
    console.log("Payment Method:", payment_method);

    try {
      if (!cart_items || cart_items.length === 0) {
        return res.status(400).json({ message: "Giỏ hàng trống!" });
      }
      const isPayment = payment_method === "COD" ? false : true;
      console.log("Is Payment:", isPayment);
      console.log("Payment Method:", payment_method);

      const newOrder = await orderModel.create({
        customer,
        address,
        phone,
        payment_method,
        date,
        time,
        is_payment: isPayment,
        items: cart_items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      });

      for (const item of cart_items) {
        const product = await productModel.findById(item.product_id);
        if (product) {
          product.stock -= item.quantity;
          if (product.stock < 0) {
            product.stock = 0;
          }
          await product.save();
        }
      }

      await cartModel.deleteMany({ account_id: req.account_id });

      return res.status(201).json({
        order: {
          _id: newOrder._id,
          customer: newOrder.customer,
          address: newOrder.address,
          phone: newOrder.phone,
          payment_method: newOrder.payment_method,
          date: newOrder.date,
          time: newOrder.time,
          items: newOrder.items,
          is_payment: newOrder.is_payment,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Error creating order", error });
    }
  },

  getOrder: async (req, res) => {
    const { customer, address, phone, date, time } = req.query;

    const body_query = {};
    if (customer) {
      body_query.customer = { $regex: ".*" + customer + ".*", $options: "i" };
    }
    if (address) {
      body_query.address = { $regex: ".*" + address + ".*", $options: "i" };
    }
    if (phone) {
      body_query.phone = phone;
    }
    if (date) {
      body_query.date = date;
    }
    if (time) {
      body_query.time = time;
    }

    try {
      const orders = await orderModel.find(body_query).populate({
        path: "items.product_id",
        select: "product_name price img",
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
      const order = await orderModel.findById(orderId).populate({
        path: "items.product_id",
        select: "product_name price img",
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
  updatePaymentStatus: async (req, res) => {
    const { orderId, status, accountId } = req.body;
    console.log("Received accountId:", accountId);

    try {
      // Lấy thông tin đơn hàng
      const order = await orderModel
        .findById(orderId)
        .populate("items.product_id");
      if (!order) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
      }

      if (status === 1) {
        for (const item of order.items) {
          const productId = item.product_id._id;
          const quantityOrdered = item.quantity;

          // Tìm sản phẩm trong kho
          const productInStock = await Kho.findOne({ Product: productId });

          if (!productInStock) {
            console.log(`Sản phẩm với ID ${productId} không có trong kho`);
            continue;
          }

          // Kiểm tra số lượng trong kho
          if (productInStock.quantity < quantityOrdered) {
            console.log(
              `Số lượng trong kho không đủ cho sản phẩm ${productId}`
            );
            continue;
          }

          // Cập nhật số lượng trong kho
          productInStock.quantity -= quantityOrdered;
          await productInStock.save();

          console.log(
            `Đã trừ ${quantityOrdered} sản phẩm ${productId} khỏi kho`
          );
        }

        if (order.payment_method === "ZaloPay") {
          order.is_payment = true;
        } else if (order.payment_method === "COD") {
          order.is_payment = false;
        }
        await order.save();
        if (accountId) {
          await deleteCart(accountId);
        }

        return res.status(200).json({
          message: "Cập nhật trạng thái thanh toán thành công và xóa giỏ hàng!",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Thanh toán thất bại hoặc chưa hoàn thành!" });
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      return res
        .status(500)
        .json({ message: "Lỗi khi cập nhật trạng thái thanh toán", error });
    }
  },
};