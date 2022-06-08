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
				if (doc.users.includes(user)) {
					res.status(200).json({
						status: 'success',
						authorization: 'Success',
					})
				} else {
					res.status(401).json({
						status: 'failed',
						authorization: 'Unauthorized',
					})
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

module.exports = AuthorizationController
