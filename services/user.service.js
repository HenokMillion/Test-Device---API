const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.registerUser = user => {
    if (user.password) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    }
    return User.create(user)
}

exports.findUserById = id => {
    return User.findOne({ id })
}

exports.updateUserById = (id, updateParams) => {
    if (updateParams.password) {
        updateParams.password = bcrypt.hashSync(updateParams.password, bcrypt.genSaltSync(10))
    }
    return User.findByIdAndUpdate(id, updateParams)
}

exports.findUserByEmail = (email) => {
    return User.findOne({ email })
}

exports.authUser = (email, password) => {
    return User.findOne({ email, active:true })
        .then(user => {
            if (bcrypt.compareSync(password, user.password)) {
                return user
            } else {
                return null
            }
        })
}

exports.checkoutDevice = (user, device) => {
    return User.findOneAndUpdate({ email: user.email }, {
        $push: { checkoutHistory: { device, time: new Date() } }
    })
}

exports.checkInDevice = (device, user) => {
    console.log('USER... ', user)
    console.log('DEVICE... ', device)
    return User.findOneAndUpdate({ email: user.email }, {
        $pull: { checkoutHistory: { "device._id": device._id } }
    })
}

exports.listUsers = () => {
    return User.find()
}