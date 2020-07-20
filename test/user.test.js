const { queryInterface } = require('../models').sequelize
const request = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sinon = require('sinon')
const app = require('../app')

describe('user router', () => {
  beforeAll(() => queryInterface.bulkDelete('Users'))

  describe('POST /users/register', () => {
    describe('successfully registered', () => {
      sinon.stub(bcrypt, 'genSaltSync').returns('test')
      sinon.stub(bcrypt, 'hashSync').returns('test')
      test('created new user', (done) => {
        request(app)
          .post('/users/register')
          .send({
            first_name: 'ahmed',
            last_name: 'jamal',
            email: 'ahmed@gmail.com',
            password: 'test',
            phone_number: '+6281234567890',
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(({ body: { newUser } }) => {
            expect(newUser).toHaveProperty('first_name', 'ahmed')
            expect(newUser).toHaveProperty('last_name', 'jamal')
            expect(newUser).toHaveProperty('email', 'ahmed@gmail.com')
            expect(newUser).toHaveProperty('password', 'test')
            expect(newUser).toHaveProperty('createdAt')
            expect(newUser).toHaveProperty('updatedAt')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })
  describe('POST /users/login', () => {
    describe('successfully logged in', () => {
      sinon.stub(jwt, 'sign').returns('!@#$%^&*()')
      sinon.stub(bcrypt, 'compareSync').returns('test')
      test('logged in new user', (done) => {
        request(app)
          .post('/users/login')
          .send({
            email: 'ahmed@gmail.com',
            password: 'test'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(({ body }) => {
            expect(body).toHaveProperty('access_token', '!@#$%^&*()')
          })
          .end(err => err ? done(err) : done())
      })
    })
  })

  afterAll(() => { queryInterface.bulkDelete('Users'); })
})