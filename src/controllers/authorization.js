/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const Customer = require('../models/customer')
const { MongooseError, ConflictError } = require('../errors')

const logger = require('../../logger')
const Door = require('../models/door')

class AuthorizationController {
	static async checkAuthorization(req, res, next) {
		logger.info('[+] CONTROLLER - check  =>  Handle request')
		const { user, lock } = req.body
		Door.findById(lock)
			.then((doc) => {
				if (doc.status !== 'active') {
					return res.status(403).json({
						status: 'failed',
						message: 'The Lock was not active',
					})
				}

				if (doc.users.includes(user)) {
					return res.status(200).json({
						status: 'success',
						authorization: 'Success',
					})
				}

				return res.status(403).json({
					status: 'failed',
					authorization: 'Failed',
					message: 'The user is not authorized for this lock.',
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

module.exports = AuthorizationController
