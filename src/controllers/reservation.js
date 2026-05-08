const Reservation = require("../models/reservation/reservation")

// get all reservations
const getAllReserations = async (req, res) => {
    try {
        const all = await Reservation.find();

        res.status(200).json({
            total: all.length,
            data: all
        });
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// get one reservation
const getOneReservation = async (req, res) => {
    const id = req.params.id;

    try {
        const reservation = await Reservation.findById(id);

        res.status(200).json(reservation);

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// create reservation
const createReservation = async (req, res) => {

    const {user_id, table_preference, date, time, guests_count, note} = req.body;

    try {

        const reservation = await Reservation.create({user_id, table_preference, date, time, guests_count, note});

        res.status(201).json(reservation);

    } catch(err){
        res.status(200).json({
            message: err.message
        })
    }
}

module.exports = { getAllReserations, getOneReservation, createReservation };