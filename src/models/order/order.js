const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
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
    address: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending','confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    payment_method: {
        type: String,
        enum: ['cash', 'click','payme', 'card'],
        default: 'card',    
    },
    payment_status: {
        type: Boolean,
        default: false
    },
    total_price: {
        type: Number,
        required: true,
        min: 0
    },
    delivery_fee: {
        type: Number,
        min: 0,
        required: true
    },
    notes: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false

});

module.exports = mongoose.model('Order', orderSchema)
