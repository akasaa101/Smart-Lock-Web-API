const mongoose = require('mongoose')
const logger = require('../../logger')
const { MongooseError, ConflictError } = require('../errors')

const Door = require('../models/door')

class DoorController {
	static async createDoor(req, res, next) {
		logger.info('[+] CONTROLLER - createDoor  =>  Handle request')
		const door = new Door({
			_id: new mongoose.Types.ObjectId(),
			number: req.body.number,
		})
		Door.find({ number: req.body.number }).then((doc) => {
			if (doc.length >= 1) {
				next(new ConflictError('Customer email already exist'))
			}
		})
		door.save()
			.then((doc) => {
				res.status(201).json({
					status: 'success',
					message: 'created',
					door: {
						// eslint-disable-next-line no-underscore-dangle
						id: doc._id,
						number: doc.number,
					},
				})
			})
			.catch((err) => {
				next(new MongooseError(err.code, err.message))
			})
	}

	static async getDoor(req, res) {
		logger.info(`Handle request for getAllDoors`)
		res.status(200).json({ status: 'success' })
	}

	static async getAllDoors(req, res) {
		logger.info(`Handle request for getAllDoors`)
		res.status(200).json({ status: 'success' })
	}

	static async updateDoor(req, res) {
		logger.info(`Handle request for getAllDoors`)
		res.status(200).json({ status: 'success' })
	}

	static async deleteDoor(req, res) {
		logger.info(`Handle request for getAllDoors`)
		res.status(200).json({ status: 'success' })
	}
}

module.exports = DoorController
