
const { User } = require('../models')
const { compare_password } = require('../helpers/bcrypt')
const { generate_token } = require('../helpers/jwt')

class UserController {
  static async register (req, res, next) {
    let {
      first_name,
      last_name,
      email,
      password,
      phone_number
    } = req.body
    
    const newUser = await User.create ({
      first_name,
      last_name,
      email,
      password,
      phone_number: +phone_number
    })
    if (newUser)
      res
        .status(201)
        .json({ newUser })
    else
      res
        .send({ newUser }) // [error handling for a moment]
  } // [success created] [error cant handled]

  static async login (req, res, next) {
    const {
      email,
      password
    } = req.body
    const user = await User.findOne({ where: {
      email
    } })
    if (!user)
      res
        .send({ msg: 'You have not registed yet' })
    // // compare_password
    const validatePassword = compare_password(password, user.password)
    if (validatePassword) 
    // generate token
      res
        .status(200)
        .json({ access_token: generate_token({ id: user.id, email: user.email }) })
    else
      res
        .send({ msg: 'Invalid email or password' })
  }
} // [success login] [error login]

module.exports = UserController
