if
(
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'test'
)
{
  require('dotenv').config()
}

const errHandler = require('./helpers/err')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
// const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errHandler)

// app.listen(PORT, () => {
//   console.clear()
//   console.log('🚀 Angular server run on port', +PORT)
// })

module.exports = app
