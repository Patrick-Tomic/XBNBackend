const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController')
const brandController = require('../controllers/brandController')
const categoryController = require('../controllers/categoryController')
router.post('/signup', userController.signup)

router.get('/allitems', itemController.items)

router.get('/brands',brandController.brands)

router.get('/categories', categoryController.categories)

module.exports = router