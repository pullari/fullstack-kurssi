const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { errorHandler } = require('./utils/middleware')
const { MONGODB_URI } = require('./utils/config')

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(bodyParser.json())
app.use(cors())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app