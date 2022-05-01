const logger = require('../../logger')

class DoorController {
	static async getAllDoors(req, res) {
		logger.info(`Handle request for getAllDoors`)
		res.status(200).json({ status: 'success' })
	}
}

module.exports = DoorController
