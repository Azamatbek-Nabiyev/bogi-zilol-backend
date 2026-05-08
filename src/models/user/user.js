const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    phone: {
        type: String,
        required: true,
        minLength: 12,
        maxLength: 12
    },
    password: {
        type: String,
        minLength: 6,
        select: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)