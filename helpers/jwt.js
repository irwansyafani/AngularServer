
const jwt = require('jsonwebtoken')

const generate_token = (payload) => {
  return jwt.sign(payload, process.env.SECRET)
}

const compare_token = (token) => {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
  generate_token,
  compare_token
}
