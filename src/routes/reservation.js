const express = require('express');
const { getAllReserations, getOneReservation, createReservation, deleteReservation } = require('../controllers/reservation');

const reservationRouter = express.Router();

// get all
reservationRouter.get('/', getAllReserations);

// get one
reservationRouter.get('/:id', getOneReservation);

// delete one
reservationRouter.delete('/:id', deleteReservation);

// create
reservationRouter.post('/', createReservation);


module.exports = reservationRouter;