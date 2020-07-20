const router = require('express').Router()
const CartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', CartController.findAll)
router.get('/:id', CartController.findById)

router.post('/', CartController.add)
router.put('/:id', authorization, CartController.edit)
router.delete('/:id', authorization, CartController.cancel)


module.exports = router