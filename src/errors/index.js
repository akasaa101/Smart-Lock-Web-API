const NotFoundError = require('./not_found')
const UnknownError = require('./unknown')
const MongooseError = require('./mongoose')
const ConflictError = require('./conflict')

function generateError(err) {
	switch (err.type) {
		case 'notfound':
			return new NotFoundError()
		case 'conflict':
			return new ConflictError()
		case 'mongoose':
			return new MongooseError()
		default:
			return new UnknownError(err.message)
	}
}

module.exports = {
	generateError,
	ConflictError,
	NotFoundError,
	MongooseError,
}
