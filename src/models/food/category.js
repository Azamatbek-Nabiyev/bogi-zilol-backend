const mongoose = require('mongoose');

const foodCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('FoodCategory', foodCategorySchema)