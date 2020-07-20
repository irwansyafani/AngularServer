
const { Product } = require('../models')

class ProductController {
  static async findAll (req, res, next) {
    const products = await Product.findAll()
    if (products)
      res
        .status(200)
        .json({ products })
    else
      res
        .send({ products })
  } // [success get] [tested]
  
  static async findById (req, res, next) {
    const {
      id
    } = req.params
    const product = await Product.findOne({ where: { id } })
    if (product)
      res
        .status(200)
        .json({ product })
    else 
      res
        .send({ user })
  } // [success get] [tested]
  
  static async create (req, res, next) {
    const {
      product_name,
      product_image,
      price,
      stock,
      category
    } = req.body

    const newProduct = await Product.create({
      product_name,
      product_image,
      price,
      stock,
      category
    })

    if (newProduct)
      res
        .status(201)
        .json({ newProduct })
    else
      res
        .send({ newProduct })
  } // [success created] [tested]
  
  static async edit (req, res, next) {
    const {
      product_name,
      product_image,
      price,
      stock,
      category
    } = req.body
    let { id } = req.params

    if (!price || !stock)
      res
        .send({ msg: 'Product Can\'t Updated' })

    const updateProduct = await Product.update({
        product_name,
        product_image,
        price,
        stock,
        category
      },{
        where: {
          id
        } 
      })
    if (updateProduct)
      res
        .status(203)
        .json({ msg: 'Product Updated' })
    else
      res
        .send({ msg: 'Product Can\'t Updated' })
  } // [success updated] 
  
  static async delete (req, res, next) {
    const { id } = req.params

    const deleteProduct = await Product.destroy({
      where: {
        id
      }
    })
    if (deleteProduct) 
      res
        .status(203)
        .json({ msg: 'Product Deleted' })
    else
      res
        .send({ msg: 'Product Can\'t Deleted' })
  }
} // [success deleted] [error deleted]

module.exports = ProductController
