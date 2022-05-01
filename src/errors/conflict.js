class Conflict extends Error {
	constructor(msg) {
		super(`Conflict Error`)
		this.type = 'conflict'
		this.title = 'Dublicate Item'
		this.message = msg
		this.status = 409
	}
}

module.exports = Conflict
