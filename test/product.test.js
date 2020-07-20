const { queryInterface } = require('../models').sequelize
const request = require('supertest')
const app = require('../app')

let productID

describe('product routes', () => {
  beforeAll(() => queryInterface.bulkDelete('Products'))

  describe('GET /products', () => {
    describe('successfully find all products', () => {
      test('found all products', (done) => {
        request(app)
          .get('/products')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(({ body }) => {
            expect(body).toHaveProperty('products')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })
  describe('POST /product', () => {
    describe('successfully create product', () => {
      test('created product', (done) => {
        request(app)
          .post('/products')
          .send({
            product_name: 'Louis Vuitton',
            product_image: 'https://louisvuitton.co',
            price: 2000000,
            stock: 200,
            category: 'lux'
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(({ body: { newProduct } }) => {
            productID = newProduct.id
            expect(newProduct).toHaveProperty('id')
            expect(newProduct).toHaveProperty('product_name', 'Louis Vuitton')
            expect(newProduct).toHaveProperty('product_image', 'https://louisvuitton.co')
            expect(newProduct).toHaveProperty('price', 2000000)
            expect(newProduct).toHaveProperty('stock', 200)
            expect(newProduct).toHaveProperty('category', 'lux')
            expect(newProduct).toHaveProperty('createdAt')
            expect(newProduct).toHaveProperty('updatedAt')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })
  describe('GET BY ID /product', () => {
    describe('successfully find a product', () => {
      test('product found', (done) => {
        request(app)
          .get(`/products/${productID}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(({ body: { product } }) => {
            expect(product).toHaveProperty('id', productID)
            expect(product).toHaveProperty('product_name', 'Louis Vuitton')
            expect(product).toHaveProperty('product_image', 'https://louisvuitton.co')
            expect(product).toHaveProperty('stock', 200)
            expect(product).toHaveProperty('category', 'lux')
            expect(product).toHaveProperty('createdAt')
            expect(product).toHaveProperty('updatedAt')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })
  describe('EDIT BY ID /product', () => {
    describe('successfully update a product', () => {
      test('product updated', (done) => {
        request(app)
          .put(`/products/${productID}`)
          .send({
            product_name: 'Gucci',
            product_image: 'https://gucci.co',
            price: 5000000,
            stock: 10,
            category: 'lux'
          })
          .expect(203)
          .expect('Content-Type', /json/)
          .expect(({ body: { msg } }) => {
            expect(msg).toContain('Product Updated')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })
  describe('DELETE BY ID /product', () => {
    describe('successfully delete a product', () => {
      test('product deleted', (done) => {
        request(app)
          .delete(`/products/${productID}`)
          .expect(203)
          .expect('Content-Type', /json/)
          .expect(({ body: { msg } }) => {
            expect(msg).toContain('Product Deleted')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })

  afterAll(() => {
    queryInterface.bulkDelete('Products')
  })
})