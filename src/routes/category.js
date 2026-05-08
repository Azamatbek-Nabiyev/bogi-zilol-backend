const express = require('express');
const {getAllCategories, createCategory, getOneCategory, updateCategory} = require('../controllers/category');

const categoryRouter = express.Router();

// get all categories
categoryRouter.get('/', getAllCategories);

// create category
categoryRouter.post('/create', createCategory);

// get one category
categoryRouter.get('/:id', getOneCategory);

// update category
categoryRouter.patch('/:id', updateCategory);

module.exports = categoryRouter;