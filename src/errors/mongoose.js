class MongooseError extends Error {
	constructor(code, message) {
		super(`Mongoose Error`)
		this.type = 'mongoose'
		this.title = 'Mongoose Error'
		this.message = message
		this.code = code
		this.status = 404
	}
}
module.exports = MongooseError
