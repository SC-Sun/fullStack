const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

const userExtractor = async (req,res, next) => {
  const authorization = req.get('authorization'); 
  if(authorization.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET)
      console.log('secrete = ', process.env.SECRET)
      console.log('decodedTOken == ', decodedToken)
    if(decodedToken) {
      req.user = await User.findById(decodedToken.id)
    } if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
  }
  next()
} 

 



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted ID' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
}

module.exports = {
  unknownEndpoint,
  requestLogger,
  errorHandler,
  userExtractor,
  extractToken
}