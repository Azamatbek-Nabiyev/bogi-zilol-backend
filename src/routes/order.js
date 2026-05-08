const express = require('express');
const { createOrder, getAllOrders, getOneOrder } = require('../controllers/order');

const orderRouter = express.Router();

// create order
orderRouter.post('/create-order', createOrder);

// get all
orderRouter.get('/', getAllOrders);

// get one
orderRouter.get('/:id', getOneOrder);

module.exports = orderRouter