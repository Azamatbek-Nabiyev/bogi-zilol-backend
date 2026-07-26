const express = require('express');
const { getAllReserations, getOneReservation, createReservation, deleteReservation } = require('../controllers/reservation');
const { protect, restrictTo } = require('../controllers/authController');

const reservationRouter = express.Router();

// get all
reservationRouter.get('/', protect, restrictTo('admin'), getAllReserations);

// get one
reservationRouter.get('/:id', protect, restrictTo('admin'), getOneReservation);

// delete one
reservationRouter.delete('/:id', protect, restrictTo('admin'), deleteReservation);

// create
reservationRouter.post('/', protect, restrictTo('user'), createReservation);

module.exports = reservationRouter;