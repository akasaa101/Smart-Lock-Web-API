/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Customer = require('../models/customer')
const { MongooseError, ConflictError, NotFoundError } = require('../errors')
const logger = require('../../logger')

class UserController {
	static async registerUser(req, res, next) {
		logger.info('[+] CONTROLLER - createCustomer  =>  Handle request')
		const { name, surname, phone, email, password } = req.body
		Customer.find({ email })
			.exec()
			.then((user) => {
				if (user.length >= 1) {
					return res.status(409).json({
						message: 'Mail exist',
					})
				} else {
					bcrypt.hash(password, 10, (err, hash) => {
						if (err) {
							res.status(500).json({
								error: err,
							})
						} else {
							const customer = new Customer({
								_id: new mongoose.Types.ObjectId(),
								email,
								password: hash,
								name,
								surname,
								phone,
							})
							customer
								.save()
								.then((result) => {
									logger.info('User Created Succesfully')
									res.status(201).json({
										message: 'User created',
										user: result,
									})
								})
								.catch((error) => {
									logger.error(error)
									res.status(500).json({
										error,
									})
								})
						}
					})
				}
			})
			.catch((err) => {
				logger.error(err)
				res.status(500).json({ status: 'failed', message: 'An error occurred while registering user' })
			})
	}

	static async loginUser(req, res, next) {
		Customer.find({ email: req.body.email })
			.exec()
			.then((user) => {
				if (user.length < 1) {
					return res.status(401).json({
						message: 'Auth failed',
					})
				}
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: 'Auth failed',
						})
					}
					if (result) {
						const token = jwt.sign(
							{
								email: user[0].email,
								userId: user[0]._id,
							},
							'secret_jwt_',
							{
								expiresIn: '1h',
							}
						)
						return res.status(200).json({
							message: 'Auth successful',
							token,
						})
					}
					res.status(401).json({
						message: 'Auth failed',
					})
				})
			})
			.catch((err) => {
				console.log(err)
				res.status(500).json({
					error: err,
				})
			})
	}
}

module.exports = UserController
