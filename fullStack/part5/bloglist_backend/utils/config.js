require('dotenv').config()

const   VITE_PORT = process.env.VITE_PORT

const  VITE_MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.VITE_MONGODB_URI

module.exports = {
  VITE_MONGODB_URI,
    VITE_PORT
}