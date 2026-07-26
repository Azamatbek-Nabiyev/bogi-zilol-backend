const express = require('express');
const {getAllFoods, getOneFood, createFood, updateFood, deleteFood} = require('../controllers/food');
const {protect, restrictTo} = require('../controllers/authController');

const foodRouter = express.Router();

// get all foods
foodRouter.get('/', getAllFoods);

// get one food
foodRouter.get('/:id', getOneFood);

// create food
foodRouter.post('/create', protect, restrictTo('admin'), createFood);

// update food
foodRouter.patch('/:id', protect, restrictTo('admin'), updateFood);

// delete food
foodRouter.delete('/:id', protect, restrictTo('admin'), deleteFood);

module.exports = foodRouter