class UnkownError extends Error {
	constructor(msg) {
		super(`Unknown Error`)
		this.type = 'unkonwn'
		this.title = 'Unknown Error'
		this.message = msg
		this.status = 500
	}
}

module.exports = UnkownError
