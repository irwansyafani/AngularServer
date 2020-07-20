
const { User } = require('../models')
const { compare_token } = require('../helpers/jwt')

const authentication = (req, res, next) => {
  let decode = compare_token(req.headers.access_token)

  User.findOne({ where: { id: decode.id } })
    .then((data) => {
      if (data) {
        req.UserId = data.id
        next()
      }
    })
    .catch(err => {
      next(err)
    })
} // [success get] [error handled]

module.exports = authentication
