const Device = require('../models/device.model')
const userService = require('./user.service')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.registerDevice = device => {
    device.reviews = []
    return Device.create(device)
}

exports.findDeviceById = id => {
    console.log(id)
    return Device.findById(id)
}

exports.updateDeviceById = (id, updateParams) => {
    return Device.findByIdAndUpdate(id, updateParams)
}

exports.checkoutDevice = (device, user) => {
    return Device.findById(device._id).then(_device => {
        if (_device.isCheckedOut) {
            return false
        } else {
            return Device.findByIdAndUpdate(device._id, {
                isCheckedOut: true,
                lastCheckedOutBy: user,
                lastCheckedOutDate: new Date(),
            })
                .then(_device => {
                    return userService.checkoutDevice(user, device)
                })
        }
    })
}

exports.checkInDevice = (device, user) => {
    return Device.findById(device._id)
        .then(_device => {
            if (_device.isCheckedOut) {
                return Device.findByIdAndUpdate(device._id, {
                    isCheckedOut: false,
                    lastCheckedInDate: new Date()
                })
                .then(_device => {
                    return userService.checkInDevice(device, user)
                })
            } else {
                return false
            }
        })
        .catch(err => {
            return false
        })
}

exports.listDevices = () => {
    return Device.find().sort({'createdAt': -1}).limit(10)
}

exports.submitReview = (device, user, review) => {
    return Device.findByIdAndUpdate(device._id, {
        $push: {
            reviews: {
                review,
                user,
                time: new Date()
            }
        }
    })
}