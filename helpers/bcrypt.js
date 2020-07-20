
const bcrypt = require('bcryptjs')

const generate_password = (password) => {
  let salt = bcrypt.genSaltSync(+process.env.HASH)
  let hash = bcrypt.hashSync(password, salt)
  return hash
}

const compare_password = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  generate_password,
  compare_password
}
