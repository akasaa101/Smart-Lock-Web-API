const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../../logger')

// const Admin = require('../models/admin')

class AdminController {
	static async login(req, res) {
		logger.info('[+] CONTROLLER - login  =>  Handle request')
		const { username, password } = req.body
		bcrypt.compare(password, process.env.ADMIN_HASH, (err, result) => {
			if (username === 'admin' && result === true) {
				const token = jwt.sign(
					{
						username,
					},
					process.env.JWT_KEY,
					{
						expiresIn: '1h',
					}
				)
				return res.status(200).json({
					status: 'success',
					message: 'authenticated',
					token,
				})
			}

			return res.status(401).json({
				status: 'failed',
				message: 'unauthenticated',
			})
		})
	}
}

module.exports = AdminController
