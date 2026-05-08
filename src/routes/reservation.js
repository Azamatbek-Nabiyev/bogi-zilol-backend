const express = require('express');
const { getAllReserations, getOneReservation, createReservation } = require('../controllers/reservation');

const reservationRouter = express.Router();


// get all
reservationRouter.get('/', getAllReserations);

// get one
reservationRouter.get('/:id', getOneReservation);

// create
reservationRouter.post('/', createReservation);


module.exports = reservationRouter;