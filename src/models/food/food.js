const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
    },
    is_available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false

});

module.exports = mongoose.model('Food', foodSchema)