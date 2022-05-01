const http = require('http')
const app = require('./app')
const logger = require('../logger')

const server = http.createServer(app)
const port = process.env.PORT || 3000

server.listen(port, () => {
	logger.info(`🧑 Smart Lock Service Running On ${port}`)
})
