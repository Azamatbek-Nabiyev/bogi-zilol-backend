const User = require('./user/user');
const PendingSignUp = require('./user/pendingSignUp');
const Food = require('./food/food'); 
const FoodCategory = require('./food/category');
const Order = require('./order/order');
const OrderItem = require('./order/orderItem');
const Reservation = require('./reservation/reservation');

module.exports = { User, PendingSignUp, Food, FoodCategory, Order, Reservation };