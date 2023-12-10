
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')

const server = http.createServer(app);

server.listen(config.VITE_PORT, () => {
  logger.info(`Server is running on port ${config.VITE_PORT}`);
})