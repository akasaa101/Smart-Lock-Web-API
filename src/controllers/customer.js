const mongoose = require('mongoose')
const Customer = require('../models/customer')
const { MongooseError, ConflictError } = require('../errors')

const logger = require('../../logger')

class CustomerController {
	static async createCustomer(req, res, next) {
		logger.info('[+] CONTROLLER - createCustomer  =>  Handle request')
		const { name, surname, email, password } = req.body
		if (
			email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			console.log('haha')
		}
		Customer.find({ email })
			.exec()
			.then((customer) => {
				if (customer.length >= 1) {
					next(new ConflictError('Customer email already exist'))
				}
			})
			.then(() => {
				const customer = new Customer({
					_id: new mongoose.Types.ObjectId(),
					name,
					surname,
					email,
					password,
				})
				return customer.save()
			})
			.then((doc) => {
				res.status(201).json({
					status: 'success',
					message: 'created',
					customer: {
						// eslint-disable-next-line no-underscore-dangle
						id: doc._id,
						name: doc.name,
						surname: doc.surname,
						email: doc.email,
					},
				})
			})
			.catch((error) => {
				next(new MongooseError(error.code, error.message))
			})
	}
}

module.exports = CustomerController
