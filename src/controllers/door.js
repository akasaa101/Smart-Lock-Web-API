/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const logger = require('../../logger')
const { MongooseError, ConflictError, NotFoundError } = require('../errors')

const Door = require('../models/door')
const Customer = require('../models/customer')

class DoorController {
	static async createDoor(req, res, next) {
		logger.info('[+] CONTROLLER - createDoor  =>  Handle request')
		const door = new Door({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			status: 'active',
			users: [],
		})
		Door.find({ name: req.body.name }).then((doc) => {
			if (doc.length >= 1) {
				next(new ConflictError('Door name already exist'))
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
						name: doc.name,
						status: doc.status,
						users: doc.users,
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
						name: door.name,
						status: door.status,
						users: door.users,
					},
				})
			})
			.catch((err) => {
				next(new MongooseError(err.code, err.message))
			})
	}

	static async authorize(req, res, next) {
		logger.info('[+] CONTROLLER - authorize  =>  Handle request')
		// const { user_id } = req.body

		const filter = { number: req.body.number }
		const update = { $push: { users: req.body.user } }
		const options = { new: true }
		Customer.findById(req.body.user)
			.then((doc) => {
				if (!doc) return res.status(404).json({ status: 'failed', message: 'Customer ID cannot find ' })
				return Door.findOneAndUpdate(filter, update, options)
			})
			.then((doc) => {
				logger.info(doc)
			})
			.catch((err) => logger.err(err))

		/* Door.findById(req.params.doorID)
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
			}) */
	}

	static async unAuthorize(req, res, next) {
		logger.info('[+] CONTROLLER - un-authorize  =>  Handle request')

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

	static async addUser(req, res, next) {
		logger.info('[+] CONTROLLER - add users  =>  Handle request')

		const id = req.params.lock_id
		const { user } = req.body
		const filter = {
			_id: id,
		}

		const updateParams = {
			$push: {
				users: user,
			},
		}
		Door.findById(id)
			.then((doc) => {
				if (doc.users.includes(user)) res.status(401).json({ status: 'failed', message: 'User already authorized for this lock.' })
			})
			.then(() => Door.findOneAndUpdate(filter, updateParams, { new: true }))
			.then((doc) => {
				res.status(201).json({
					status: 'success',
					lock: doc,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	static async removeUser(req, res, next) {
		logger.info('[+] CONTROLLER - add users  =>  Handle request')

		const id = req.params.lock_id
		const { user } = req.body
		const filter = {
			_id: id,
		}

		const updateParams = {
			$pull: {
				users: user,
			},
		}
		Door.findById(id)
			.then((doc) => {
				if (!doc.users.includes(user)) res.status(401).json({ status: 'failed', message: 'User already un-authorized for this lock.' })
			})
			.then(() => Door.findOneAndUpdate(filter, updateParams, { new: true }))
			.then((doc) => {
				res.status(201).json({
					status: 'success',
					lock: doc,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

module.exports = DoorController
