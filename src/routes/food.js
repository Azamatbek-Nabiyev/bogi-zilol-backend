const express = require('express');
const {getAllFoods, getOneFood, createFood, updateFood, deleteFood} = require('../controllers/food');

const foodRouter = express.Router();

// get all foods
foodRouter.get('/', getAllFoods);

// get one food
foodRouter.get('/:id', getOneFood);

// create food
foodRouter.post('/create', createFood);

// update food
foodRouter.patch('/:id', updateFood);

// delete food
foodRouter.delete('/:id', deleteFood);

module.exports = foodRouter