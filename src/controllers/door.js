const mongoose = require('mongoose')
const logger = require('../../logger')
const { MongooseError, ConflictError, NotFoundError } = require('../errors')

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
				next(new ConflictError('Door number already exist'))
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

	// HERE BACKEND get all doors
	static async getAllDoors(req, res, next) {
		logger.info('[+] CONTROLLER - createDoor  =>  Handle request')

		Door.find() // Connect Database and find all datas
			.then((doors) => {
				// after call this datas as "doors"
				res.status(200).json({
					// send a response to frontend application
					status: 'success',
					message: 'created',
					doors: doors.map((v) => ({
						// eslint-disable-next-line no-underscore-dangle
						id: v._id,
						number: v.number,
						status: v.status,
						name: v.name,
						users: v.users,
					})),
				})
			})
			.catch((error) => {
				next(new MongooseError(error.code, error.message))
			})
	}

	static async getDoor(req, res, next) {
		logger.info('[+] CONTROLLER - getDoor  =>  Handle request')

		Door.findById(req.params.doorID)
			.then((door) => {
				if (door === null) return next(new NotFoundError())
				res.status(200).json({
					status: 'success',
					message: 'success',
					door: {
						// eslint-disable-next-line no-underscore-dangle
						id: door._id,
						number: door.number,
						status: door.status,
					},
				})
			})
			.catch((err) => {
				next(new MongooseError(err.code, err.message))
			})
	}
}

module.exports = DoorController
