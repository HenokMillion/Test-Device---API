'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    id: { type: String, required: true, default: 0 },
    name: String,
    os: String,
    manufacturer: String,
    lastCheckedOutDate: Date,
    lastCheckedOutBy: Object,
    lastCheckedInDate: Date,
    isCheckedOut: { type: Boolean, default: false },
    reviews: [{
        review: String,
        user: Object,
        time: Date
    }]
}, { timestamps: true })

const Device = mongoose.model('device', deviceSchema);

module.exports = Device