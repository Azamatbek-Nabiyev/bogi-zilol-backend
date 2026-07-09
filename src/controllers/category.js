const { FoodCategory } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// get all categories
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await FoodCategory.find({});

  res.status(200).json({
    total: categories.length,
    data: categories,
  });
});

// create category
const createCategory = catchAsync(async (req, res, next) => {
  const { name, image, is_active } = req.body;

  const category = await FoodCategory.create({ name, image, is_active });

  res.status(201).json(category);
});

// get one category
const getOneCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const category = await FoodCategory.findById(id);

  res.status(200).json(category);
});

// update category
const updateCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name, is_active } = req.body;

  const updated = await FoodCategory.findByIdAndUpdate(
    id,
    { name, is_active },
    { new: true },
  );

  res.status(200).json(updated);
});

// delete category
const deleteCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleted = await FoodCategory.findByIdAndDelete(id);

  if (!deleted) {
    return next(new AppError("No category found with this ID", 404));
  }

  res.status(200).json({
    message: "Deleted!",
    data: deleted,
  });
});

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
