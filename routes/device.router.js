const router = require('express').Router();
const deviceController = require('../controllers/device.controller')

router.get('/', deviceController.listAllDevices)
router.get('/:id', deviceController.getDeviceById)
router.post('/register', deviceController.registerDevice)
router.put('/:id', deviceController.updateDeviceById)
router.post('/checkout', deviceController.checkoutDevice)
router.post('/checkin', deviceController.checkInDevice)
router.post('/review', deviceController.submitReview)

module.exports = router;