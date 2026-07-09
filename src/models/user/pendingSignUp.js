const mongoose = require('mongoose');

const pendingSignUpSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    chatId: {
        type: String
    },
    code: {
        type: String
    },
    codeExpiresAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 10 daqiqadan keyin MongoDB avtomatik ochiradi (TTL index)
    }
});

module.exports = mongoose.model('PendingSignUp', pendingSignUpSchema);