const deviceService = require('../services/device.service')

exports.registerDevice = (req, res, next) => {
    const { name,
        os,
        manufacturer } = req.body
    const valid = name && os && manufacturer
    if (!valid) {
        return res.status(400).json({ statu: 400, success: false, error: 'Bad Request' })
    }
    return deviceService.registerDevice({ name, os, manufacturer })
        .then(deviceData => {
            return res.status(201).json({ status: 201, success: true, data: deviceData })
        })
        .catch(err => {
            console.error('ERR: ', err)
        })
}

exports.getDeviceById = (req, res, next) => {
    const { id } = req.params
    return deviceService.findDeviceById(id)
        .then(device => {
            return res.status(200).json({
                status: 200,
                device,
                success: true
            })
        })
        .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}

exports.updateDeviceById = (req, res, next) => {
    const { id, updateParams } = req.body
    return deviceService.updateDeviceById(id, updateParams)
        .then(device => {
            return res.status(200).json({
                status: 200,
                device,
                success: true
            })
        })
        .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}

exports.submitReview = (req, res, next) => {
    const {device, user, review} = req.body
    return deviceService.submitReview(device, user, review)
    .then(resp => res.status(200).json({status: 200, success: true, msg: 'successfully added review'}))
    .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}

exports.checkoutDevice = (req, res, next) => {
    const { user, device } = req.body
    console.log(req.body)
    return deviceService.checkoutDevice(device, user)
        .then(device => {
            console.log('DEVICE: ', device)
            if (device) {
                return res.status(200).json({
                    status: 200,
                    msg: 'successfully checked-out device',
                    success: true
                })
            } else {
                return res.status(500).json({ status: 500, error: 'something went wrong', success: false })
            }
        })
        .catch(err => {
            return res.status(500).json({ status: 500, error: 'something went wrong', success: false })
        })
}

exports.checkInDevice = (req, res, next) => {
    const { user, device } = req.body
    return deviceService.checkInDevice(device, user)
        .then(device => {
            if (device) {
                return res.status(200).json({
                    status: 200,
                    msg: 'successfully checked-in device',
                    success: true
                })
            } else {
                return res.status(500).json({ status: 500, error: 'something went wrong', success: false })
            }
        })
        .catch(err => {
            console.log('ERROR: ', err)
            return res.status(500).json({ status: 500, error: 'something went wrong', success: false })
        })
}

exports.listAllDevices = (req, res, next) => {
    return deviceService.listDevices()
        .then(devices => {
            return res.status(200).json({
                status: 200,
                devices,
                success: true
            })
        })
        .catch(err => res.status(500).json({ status: 500, error: 'something went wrong', success: false }))
}