const express = require('express');
const {getAllCategories, createCategory, getOneCategory, updateCategory, deleteCategory} = require('../controllers/category');

const categoryRouter = express.Router();

// get all categories
categoryRouter.get('/', getAllCategories);

// create category
categoryRouter.post('/create', createCategory);

// get one category
categoryRouter.get('/:id', getOneCategory);

// update category
categoryRouter.patch('/:id', updateCategory);

// delete category
categoryRouter.delete('/:id', deleteCategory);


module.exports = categoryRouter;