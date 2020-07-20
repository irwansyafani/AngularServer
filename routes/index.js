const router = require('express').Router()

const users = require('./user')
const products = require('./products')
const carts = require('./carts')

router.use('/users', users)
router.use('/products', products)
router.use('/carts', carts)

module.exports = router