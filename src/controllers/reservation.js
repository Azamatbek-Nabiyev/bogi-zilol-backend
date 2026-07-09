const { Reservation } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// get all reservations
const getAllReserations = catchAsync(async (req, res, next) => {
  const all = await Reservation.find().populate("user_id", "-password");

  res.status(200).json({
    total: all.length,
    data: all,
  });
});

// get one reservation
const getOneReservation = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const reservation = await Reservation.findById(id).populate(
    "user_id",
    "-password",
  );

  res.status(200).json(reservation);
});

// create reservation
const createReservation = catchAsync(async (req, res, next) => {
  const { user_id, table_preference, date, time, guests_count, note } =
    req.body;

  const reservation = await Reservation.create({
    user_id,
    table_preference,
    date,
    time,
    guests_count,
    note,
  });

  res.status(201).json(reservation);
});

// delete reservation
const deleteReservation = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleted = await Reservation.findByIdAndDelete(id);

  if (!deleted) {
    return next(new AppError(`No reservation found with this ID`, 404));
  }

  res.status(200).json({
    message: "Deleted!",
    data: deleted,
  });
});

module.exports = {
  getAllReserations,
  getOneReservation,
  createReservation,
  deleteReservation,
};
