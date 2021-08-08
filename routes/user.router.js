const router = require('express').Router();
const userController = require('../controllers/user.controller')

router.get('/', userController.listUsers)
router.get('/:id', userController.getUserById)
router.post('/auth', userController.authUser)
router.put('/:id', userController.updateUserById)
router.post('/register', userController.registerUser)
router.put('/:id', userController.updateUserById)

module.exports = router;