
const router = require('express').Router()
const ProductController = require('../controllers/product')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findById)

router.post('/', ProductController.create)
router.put('/:id', ProductController.edit)
router.delete('/:id', ProductController.delete)

module.exports = router