'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    checkoutHistory: Array,
    role: {
        type: String,
        default: 'user' //other roles might be ['admin']
    },
    firstName: String,
    lastName: String,
    role: String,
    active: { type: Boolean, default: true },
    Reviews: Array
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema);