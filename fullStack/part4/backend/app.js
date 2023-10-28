const config = require('./utils/config')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/bloglist')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
logger.info('connecting to', config.MONGODB_URI)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogListRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter);


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app