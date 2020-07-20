// need include when getbyid
const { Cart } = require('../models')

class CartController {
  static async findAll (req, res, next) {
    const carts = await Cart.findAll()
    if (carts)
      res
        .status(200)
        .json({ carts })
    else
      res
        .send({ carts })
  } // [success get]

  static async findById (req, res, next) {
    const { id } = req.params

    const cart = await Cart.findOne({ where: { id } })
    if (cart)
      res
        .status(200)
        .json({ cart })
    else
      res
        .send({ cart })
  } // [success get] [error handled]

  static async add (req, res, next) {
    const {
      ProductId,
      quantity
    } = req.body
    const {
      UserId
    } = req

    if (UserId || ProductId)
      res
        .send({ msg: 'Missing secret access or product id' })

    // if product id and userid is same, you can update it

    const newCart = await Cart.create({
      UserId,
      ProductId,
      quantity
    })

    if (newCart)
      res
        .status(201)
        .json({ newCart })
    else
      res
        .send({ newCart })
  } // [success add] [error handled]

  static async edit (req, res, next) {
    let {
      ProductId,
      quantity
    } = req.body
    const {
      id
    } = req.params
    const {
      UserId
    } = req

    const updateCart = await Cart.update({
      UserId: +UserId,
      ProductId: ProductId,
      quantity: +quantity
    }, {
      where: {
        id
      }
    })

    if (updateCart)
      res
        .status(203)
        .json({ msg: 'Cart Updated' })
    else
      res
        .send({ msg: 'Cart Can\'t update' })
  } // [success updated]
  
  static async cancel (req, res, next) {
    const {
      id
    } = req.params

    const deleteCart = await Cart.destroy({
      where: {
        id
      }
    })
    if (deleteCart)
      res
        .status(203)
        .json({ msg: 'Product deleted, and Cart Updated' })
    else
      res
        .send({ msg: 'Product can\'t update' })
  } // [success deleted] [error handled]
}

module.exports = CartController
