
const { Cart } = require('../models')

const authorization = (req, res, next) => {
  const { UserId } = req
  const { id } = req.params

  Cart.findOne({ where: { id } })
    .then((data) => {
        if (data.UserId === UserId) {
          next()
        }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization
