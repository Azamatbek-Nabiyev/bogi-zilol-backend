const { Food } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// get all foods
const getAllFoods = catchAsync(async (req, res, next) => {
  const foods = await Food.find();
  res.status(200).json({
    total: foods.length,
    data: foods,
  });
});

// get one food
const getOneFood = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const food = await Food.findById(id);

  res.status(200).json(food);
});

// create food
const createFood = catchAsync(async (req, res, next) => {
  const { category_id, name, description, price, image, is_available } =
    req.body;

  const food = await Food.create({
    category_id,
    name,
    description,
    price,
    image,
    is_available,
  });

  res.status(201).json(food);
});

// update food
const updateFood = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const updated = await Food.findByIdAndUpdate(
    id,
    { $set: req.body },
    { returnDocument: "after", runValidators: true },
  );

  res.status(200).json(updated);
});

// delete category
const deleteFood = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleted = await Food.findByIdAndDelete(id);

  if (!deleted) {
    return next(new AppError(`No food found with this ID`, 404));
  }

  res.status(200).json({
    message: "Deleted!",
    data: deleted,
  });
});

module.exports = {
  getAllFoods,
  getOneFood,
  createFood,
  updateFood,
  deleteFood,
};
