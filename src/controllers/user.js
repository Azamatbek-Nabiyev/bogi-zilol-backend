const { User } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// get all
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    total: users.length,
    data: users,
  });
});

// get one
const getOneUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  res.status(200).json(user);
});

// delete
const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleted = await User.findByIdAndDelete(id);

  if (!deleted) {
    return next(new AppError("No user found with this ID", 404));
  }

  res.status(200).json({
    message: "Deleted!",
    data: deleted,
  });
});

module.exports = { getAllUsers, getOneUser, deleteUser };
