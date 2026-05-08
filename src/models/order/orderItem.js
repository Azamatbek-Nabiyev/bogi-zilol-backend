const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unit_price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true,
    versionKey: false

});

module.exports = mongoose.model('OrderItem', orderItemSchema);