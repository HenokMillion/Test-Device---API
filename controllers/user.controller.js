const userService = require('../services/user.service')
const jwt = require('jsonwebtoken')

exports.registerUser = (req, res, next) => {
    const { email, password, firstName, lastName, admin } = req.body
    const valid = email && password && firstName && lastName
    if (!valid) {
        return res.status(400).json({ statu: 400, success: false, error: 'Bad Request' })
    }
    return userService.registerUser({ email, password, firstName, lastName, role: admin || 'user'})
        .then(userData => {
            const token = jwt.sign({
                email, firstName, lastName, role: userData.role, checkoutHistory: userData.checkoutHistory
            }, process.env.JWT_SECRET, {
                expiresIn: 86400 * 7 // 7 days
            })
            return res.status(201).json({ status: 201, success: true, token: token })
        })
}

exports.getUserById = (req, res, next) => {
    const { id } = req.body
    return userService.findUserById(id)
        .then(user => {
            return res.status(200).json({
                status: 200,
                user: {
                    email: user.email,
                    role: user.role,
                    checkoutHistory: user.checkoutHistory
                },
                success: true
            })
        })
        .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}

exports.updateUserById = (req, res, next) => {
    const {updateParams} = req.body
    const {id} = req.params
    return userService.updateUserById(id, updateParams)
        .then(user => {
            return res.status(200).json({
                status: 200,
                user: {
                    role: user.role,
                    email: user.email,
                    checkoutHistory: user.checkoutHistory
                },
                success: true
            })
        })
        .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}

exports.findUserByEmail = (email) => {
    return userService.findUserByEmail({ email })
        .then(user => {
            return res.status(200).json({
                status: 200,
                user: {
                    email: user.email,
                    role: user.role,
                    checkoutHistory: user.checkoutHistory
                },
                success: true
            })
        })
        .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}

exports.authUser = (req, res, next) => {
    const { email, password } = req.body
    return userService.authUser(email, password)
        .then(user => {
            if (user) {
                console.log('USER: ', user)
                const token = jwt.sign({
                    email, firstName: user.firstName, lastName: user.lastName, role: user.role, checkoutHistory: user.checkoutHistory
                }, process.env.JWT_SECRET, {
                    expiresIn: 86400 * 7 // 7 days
                })
                return res.status(200).json({ status: 200, success: true, token: token })
            } else {
                return res.status(401).json({ status: 401, success: false, error: 'Unauthorized' })
            }
        })
        .catch(err => {
            return res.status(401).json({ status: 401, success: false, error: 'Unauthorized' })
        })
}

exports.listUsers = (req, res, next) => {
    return userService.listUsers()
        .then(users => {
            console.log('USERS: ', users)
            return res.status(201).json({
                status: 201, success: true, users: users.map(user => {
                    delete user.password
                    return user
                })
            })
        })
        .catch(err => {
            return res.status(401).json({ status: 401, success: false, error: 'Unauthorized' })
        })
}
