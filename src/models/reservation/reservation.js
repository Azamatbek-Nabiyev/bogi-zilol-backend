const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    table_preference: {
        type: String,
        enum: {
            values: ['indoor', 'outdoor', 'private_room', 'window']
        },
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    guests_count: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    note: {
        type: String,
        trim: true,
        maxLength: 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);