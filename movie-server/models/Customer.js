const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true,
        },
        isLocked : {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customer', CustomerSchema);