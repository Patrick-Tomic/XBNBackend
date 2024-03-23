const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController')

router.post('/signup', userController.signup)

router.get('/allitems', itemController.items)

module.exports = router