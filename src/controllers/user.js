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

// create user
const createUser = catchAsync(async (req, res, next) => {

  const { firstname, lastname, phone, password, role } = req.body;

  if(!phone || !password){
    return next(new AppError("Password and phone is required!", 400));
  }

  const created = await User.create({ firstname, lastname, phone, password, role })

  const userObj = created.toObject();
  delete userObj.password;

  res.status(201).json({
    status: 'success',
    data: userObj
  })

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

module.exports = { getAllUsers, getOneUser, deleteUser, createUser };
