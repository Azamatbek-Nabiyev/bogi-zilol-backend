const express = require('express');
const {getAllCategories, createCategory, getOneCategory, updateCategory, deleteCategory} = require('../controllers/category');
const {protect, restrictTo} = require('../controllers/authController');

const categoryRouter = express.Router();

// get all categories
categoryRouter.get('/', getAllCategories);

// create category
categoryRouter.post('/create', protect, restrictTo('admin'), createCategory);

// get one category
categoryRouter.get('/:id', getOneCategory);

// update category
categoryRouter.patch('/:id', protect, restrictTo('admin'), updateCategory);

// delete category
categoryRouter.delete('/:id', protect, restrictTo('admin'), deleteCategory);


module.exports = categoryRouter;