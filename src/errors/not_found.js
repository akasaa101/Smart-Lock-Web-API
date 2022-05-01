class NotFoundError extends Error {
	constructor(objectName) {
		super(`Not Found Error`)
		this.type = 'notfound'
		this.title = 'Not Found Error'
		this.message = 'Object can not be found'
		this.object = objectName
		this.status = 404
	}
}
module.exports = NotFoundError
