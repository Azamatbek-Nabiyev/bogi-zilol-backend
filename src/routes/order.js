const express = require('express');
const {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrderStatus,
  assignCourier,
} = require('../controllers/order');
const { protect, restrictTo } = require('../controllers/authController');

const orderRouter = express.Router();

// create order — har qanday login qilgan foydalanuvchi
orderRouter.post('/create-order', protect, createOrder);

// get all 
orderRouter.get('/', protect, restrictTo('admin', 'chef', 'courier'), getAllOrders);

// get one — login qilgan foydalanuvchi (o'ziniki yoki admin, controllerda tekshiriladi)
orderRouter.get('/:id', protect, getOneOrder);

// update status — faqat admin yoki kuryer
orderRouter.patch(
  '/:id/status',
  protect,
  restrictTo('admin', 'courier', 'chef'),
  updateOrderStatus
);

// assign courier
orderRouter.patch('/:id/assign-courier', protect, restrictTo('admin', 'chef'), assignCourier);


module.exports = orderRouter;