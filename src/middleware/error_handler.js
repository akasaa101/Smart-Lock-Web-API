const logger = require('../../logger')

function errorLogger(error, req, res, next) {
	logger.error(error.message)
	next(error)
}

function errorResponder(error, req, res, next) {
	switch (error.type) {
		case 'notfound':
			res.status(404).json({ status: 'failed', message: error.message })
			break
		case 'mongoose':
			res.status(401).json({ status: 'failed', message: error.message })
			break
		case 'conflict':
			res.status(409).json({ status: 'failed', message: error.message })
			break
		default:
			res.status(400).json({ message: 'An Error occurred while processing the request', type: 'undefined error', error: error.message })
			next(error)
			break
	}
}

module.exports = {
	errorLogger,
	errorResponder,
}
