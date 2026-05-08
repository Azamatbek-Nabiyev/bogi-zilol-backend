const express = require('express');
const {getAllFoods, getOneFood, createFood, updateFood} = require('../controllers/food');

const foodRouter = express.Router();

// get all foods
foodRouter.get('/', getAllFoods);

// get one food
foodRouter.get('/:id', getOneFood);

// create food
foodRouter.post('/create', createFood);

// update food
foodRouter.patch('/:id', updateFood);

module.exports = foodRouter