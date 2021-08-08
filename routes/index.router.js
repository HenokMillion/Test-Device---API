const express = require('express');
const router = express.Router();
const userRouter = require('./user.router')
const deviceRouter = require('./device.router')

router.use('/user', userRouter)
router.use('/device', deviceRouter)

module.exports = router