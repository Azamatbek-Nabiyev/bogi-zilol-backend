const mongoose = require("mongoose");
const { Order, OrderItem } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// create order
const createOrder = catchAsync(async (req, res, next) => {
  const { address, payment_method, notes, items } = req.body;
  const user_id = req.user._id;

  // Fixed delivery fee for now. If it should be calculated based on
  // distance/area, call a dedicated function here instead, e.g.:
  // const delivery_fee = await calculateDeliveryFee(address);
  const DELIVERY_FEE = 10000;
  const delivery_fee = DELIVERY_FEE;

  // 1) validate items first — before creating the order
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new AppError("Items is required!", 400));
  }

  // 2) validate required fields
  if (!user_id || !address || !payment_method) {
    return next(
      new AppError("user_id, address and payment_method are required!", 400)
    );
  }

  // 3) calculate total price on the server (never trust the client)
  const total_price =
    items.reduce((sum, e) => sum + e.unit_price * e.quantity, 0) +
    Number(delivery_fee);

  // 4) transaction — order and order items are created together or not at all
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const [order] = await Order.create(
      [
        {
          user_id,
          address,
          payment_method,
          total_price,
          delivery_fee,
          notes,
        },
      ],
      { session }
    );

    const orderItems = items.map((e) => ({
      order_id: order._id,
      food_id: e._id,
      quantity: e.quantity,
      unit_price: e.unit_price,
    }));

    await OrderItem.insertMany(orderItems, { session });

    await session.commitTransaction();

    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    await session.abortTransaction();
    return next(new AppError(err.message, 500));
  } finally {
    session.endSession();
  }
});

// get all
const getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    total: orders.length,
    data: orders,
  });
});

// get one order
const getOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  // also return the order's items
  const orderItems = await OrderItem.find({ order_id: order._id });

  res.status(200).json({
    status: "success",
    data: { ...order.toObject(), items: orderItems },
  });
});

// update status — separate endpoint, should be protected by a middleware
// (e.g. admin/courier only)
const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "confirmed",
    "preparing",
    "on_the_way",
    "delivered",
    "cancelled",
  ];

  if (!status || !allowedStatuses.includes(status)) {
    return next(new AppError("Invalid or missing status!", 400));
  }

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  res.status(200).json({ status: "success", data: order });
});

module.exports = { createOrder, getOneOrder, getAllOrders, updateOrderStatus };